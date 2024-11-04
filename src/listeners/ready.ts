import { Channel, Client, Message, TextChannel } from 'discord.js';
import { BOT_ID, CHANNEL_ID } from 'src/listeners/utils/consts'
import dateFormat from 'src/listeners/utils/dateFormat'
import { dayOfWeek, days } from 'src/listeners/utils/dayOfWeek'

export default (client: Client): void => {
  type ChannelWithSend = Channel & {
    send: (data: { files: string[] }) => Promise<Channel>;
  };

  client.on('ready', async () => {

    if (!client.user || !client.application) {
      return;
    }

    const channel: Channel | null = (await client.channels.fetch(CHANNEL_ID)) as TextChannel;

    if (!channel) {
      console.log('Канал не найден');
      return;
    }

    const messages = await channel.messages.fetch({ limit: 100 });

    const messagesByToday = messages.filter(
      (message: Message) =>
        message.author.id === BOT_ID && dateFormat(message.createdTimestamp) === dateFormat(),
    );
    if ([...messagesByToday].length) {
      process.exit();
    }
    const channelWithSend = channel as ChannelWithSend;

    switch (dayOfWeek()) {
      case days[1]:
        await channelWithSend.send({ files: ['./src/assets/monday/2.mp4'] });
        break;
      case days[2]:
        await channelWithSend.send({ files: ['./src/assets/tuesday.gif'] });
        break;
      case days[3]:
        await channelWithSend.send({ files: ['./src/assets/wednesday.gif'] });
        break;
      case days[5]:
        await channelWithSend.send({ files: ['./src/assets/friday.gif'] });
        break;
      case days[6]:
        await channelWithSend.send({ files: ['./src/assets/saturday.gif'] });
        break;
      case days[7]:
        await channelWithSend.send({ files: ['./src/assets/sunday.gif'] });
        break;
      default:
        await channelWithSend.send({ files: ['./src/assets/none.gif'] });
        break;
    }
    console.log('Сегодня: ', dayOfWeek());
    process.exit();
  });
};
