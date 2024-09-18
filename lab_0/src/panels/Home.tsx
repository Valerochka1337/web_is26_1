import { FC } from 'react';
import {
  Panel,
  PanelHeader,
  Header,
  Button,
  Group,
  Cell,
  Div,
  Avatar,
  NavIdProps,
} from '@vkontakte/vkui';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';

const getStory = () => {
  fetch("https://api.thecatapi.com/v1/images/search")
  .then(response => response.json())
  .then(cat_images => 
    bridge.send('VKWebAppShowStoryBox', {
      background_type: 'image',
      url : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fyemek.com%2Ftarif%2Fiki-renkli-kek%2F&psig=AOvVaw3mZpxvbZalkyW67zr9G_KU&ust=1726723126401000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCNijl4bfy4gDFQAAAAAdAAAAABAE'
    }).then((data) => {
        if (data.result) {
          // Редактор историй открыт
          console.log(data);
        }})
      .catch((error) => {
        // Ошибка
        console.log(error);
      }));
}

export interface HomeProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const Home: FC<HomeProps> = ({ id, fetchedUser }) => {
  const { photo_200, city, first_name, last_name } = { ...fetchedUser };

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      {fetchedUser && (
        <Group header={<Header mode="secondary">User Data Fetched with VK Bridge</Header>}>
          <Cell before={photo_200 && <Avatar src={photo_200} />} subtitle={city?.title}>
            {`${first_name} ${last_name}`}
          </Cell>
        </Group>
      )}

      <Group header={<Header mode="secondary">Navigation Example</Header>}>
        <Div>
          <Button stretched size="l" mode="secondary" onClick={getStory}>
            Press me
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};
