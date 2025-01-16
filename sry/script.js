document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname;
    if (currentPage.includes('weather.html')) {
        fetchWeather();
    } else if (currentPage.includes('acg.html')) {
        fetchACGImage();
    }
});
function fetchWeather() {
    const weatherContainer = document.getElementById('weather - container');
    fetch('https://api.vvhan.com/api/weather')
     .then(response => response.json())
     .then(order => {
        /*console.log("123"+data.data.week)*/
            // 这里根据接口返回的数据结构进行展示，假设返回的是一个简单的天气描述字符串
            weatherContainer.innerHTML = `
            <p>
           <p>城市名:${order.city}</p>
            日期:${order.data.date}
            星期:${order.data.week}
            天气:${order.data.type}
           <p>最低温度:${order.data.low}
           最高温度:${order.data.high}</p>
            <p>风向:${order.data.fengxiang}
            风力:${order.data.fengli}</p>
            </p>
            <p>空气质量指数:${order.air.aqi}</p>
            <p>空气状态:${order.air.aqi_name}</p>
            <p>空气一氧化碳含量:${order.air.co}</p>
            <p>空气臭氧含量:${order.air.o3}</p>
            <p>空气PM10含量:${order.air.pm10}</p>
            `;
        })
     .catch(error => {
            weatherContainer.innerHTML = `<p>获取天气信息失败: ${error.message}</p>`;
        });
}
function fetchACGImage() {
    const acgContainer = document.getElementById('acg - container');
    fetch('https://api.vvhan.com/api/wallpaper/acg')
     .then(response => response.json())
     .then(Anime => {
        //console.log("123"+image)
            // 假设接口返回一个包含图片URL的对象，这里直接展示图片
            const image = document.createElement('image');
            image.src = Anime.acg.html;
            //img.alt = '二次元图片';
            image.style.maxWidth = '100%';
            acgContainer.appendChild(image);
        })
     .catch(error => {
            acgContainer.innerHTML = `<p>获取二次元图片失败: ${error.message}</p>`;
        });
}
/*async function getAcgImages(){
    const apiUrl = "https://api.vvhan.com/api/wallpaper/acg"
    // try {
    const response = await fetch(apiUrl),
    const data = await response.json();
    if(data.success){
    console.log("请求成功");
    displayImages(data);
    } else {
    console.error("获取图片数据失败:",data.msg);document.getElementById("image-container").innerHTML ="获取二次元图片数据失败，请稍后重试。";
    } catch (error) {
    console.error("网络请求出现错误:",error);
    document.getElementById("image-container").innerHTML ="网络出现问题，请检査网络连接后重试。".
    //展示图片到HTML页面
    function displayImages(images){console.log("zhanshiyemian");const imageContainer = document.getElementById("image-container").const imageShow =
       <img src="${images.url}">
    imageContainer.innerHTML = imageShow;
    }

    //页面加载完成后调用获取图片数据的函数
    window.onload =getAcgImages;*/