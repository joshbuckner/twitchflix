import React, { useEffect, useState } from 'react';
import Slider from './components/NetflixSlider'
import './App.scss'

const CLIENT_ID = 'kflx12zd5s9twteaes0kfvn9tpgypw';

const App = () => {
  useEffect(() => {
    const request = async () => {
      const response = await fetch(`https://api.twitch.tv/helix/streams?game_id=513143`, {
        method: 'GET',
        headers: {
          'Client-ID': CLIENT_ID
        }
      });
      const json = await response.json();
      const tft = json.data.map((user) => {
        return {
          id: user.id,
          image: user.thumbnail_url.replace('{width}', '400').replace('{height}', '225'),
          imageBg: user.thumbnail_url.replace('{width}', '848').replace('{height}', '477'),
          title: user.user_name,
          description: user.title
        }
      });
      setData(tft);
    };
    request();
  }, []);
  const [data, setData] = useState(null);
  return (
    <div className="app">
      {
        data !== null ?
        <div>
          <div style={{
            color: 'white', 
            left: '55px', 
            marginTop: '10px', 
            position: 'absolute', 
            fontWeight: 'bold', 
            fontSize: '18px' 
          }}>
            Teamfight Tactics
          </div>
          <Slider>
            {data.map(movie => (
              <Slider.Item movie={movie} key={movie.id}>item1</Slider.Item>
            ))}
          </Slider>
        </div>
        :
        <div>Loading...</div>
      }
    </div>
  );
};
export default App;
