// 获取天气信息 API 地址
const baseWeatherAPI = 'https://api.vvhan.com/api/weather';
// 获取二次元图片 API 地址（返回 JSON 格式）
const acgAPI = 'https://api.vvhan.com/api/wallpaper/acg?type=json';

window.onload = function () {
    // 天气查询按钮点击事件处理
    const getWeatherButton = document.getElementById('getWeather');
    if (getWeatherButton) {
        getWeatherButton.addEventListener('click', () => {
            const city = document.getElementById('city').value.trim();
            if (!city) {
                alert('请输入城市名称！');
                return;
            }
            // 获取当前天气
            fetchWeatherData(`${baseWeatherAPI}?city=${city}`, displayWeather);
            // 获取一周天气
            fetchWeatherData(`${baseWeatherAPI}?city=${city}&type=week`, displayWeekWeather);
        });
    }

    // 二次元图片获取逻辑
    const acgImageElement = document.getElementById('acg-image');
    if (acgImageElement) {
        fetch(acgAPI)
           .then(response => {
                if (!response.ok) {
                    throw new Error('网络响应错误');
                }
                return response.json();
            })
           .then(data => {
                if (data && data.success && data.url) {
                    acgImageElement.src = data.url;
                } else {
                    acgImageElement.alt = '二次元图片加载失败';
                }
            })
           .catch(error => {
                console.error('ACG API Error:', error);
                acgImageElement.alt = '图片加载失败';
            });
    }
};

// 通用的获取天气数据函数，接收 API 地址和展示数据的回调函数作为参数
function fetchWeatherData(apiUrl, callback) {
    fetch(apiUrl)
       .then(response => {
            if (!response.ok) {
                throw new Error('网络响应错误');
            }
            return response.json();
        })
       .then(data => {
            if (data.success) {
                callback(data);
            } else {
                alert('获取天气信息失败，请检查相关信息！');
            }
        })
       .catch(error => {
            console.error('Weather API Error:', error);
            alert('获取天气信息失败，请稍后重试！');
        });
}

// 展示当前天气
function displayWeather(data) {
    const { city, data: weather, air, tip } = data;
    const weatherResult = document.getElementById('weather-result');
    weatherResult.innerHTML = `
      <h2>当前天气</h2>
      <p>城市：${city}</p>
      <p>日期：${weather.date}</p>
      <p>星期：${weather.week}</p>
      <p>天气：${weather.type}</p>
      <p>温度：${weather.low} ~ ${weather.high}</p>
      <p>风向：${weather.fengxiang}</p>
      <p>风力：${weather.fengli}</p>
      <p>空气质量：${air.aqi_name}（AQI：${air.aqi}）</p>
      <p>提示：${tip}</p>
    `;
}

// 展示一周天气
function displayWeekWeather(data) {
    const { city, data: weekData } = data;
    const weekWeather = document.getElementById('week-weather');
    let weekHTML = `<h2>${city} 一周天气预报</h2>`;
    weekData.forEach(day => {
        weekHTML += `
        <div style="margin-bottom: 10px;">
          <p>日期：${day.date} (${day.week})</p>
          <p>天气：${day.type}</p>
          <p>温度：${day.low} ~ ${day.high}</p>
          <p>风向：${day.fengxiang}</p>
          <p>风力：${day.fengli}</p>
        </div>
      `;
    });
    weekWeather.innerHTML = weekHTML;
}