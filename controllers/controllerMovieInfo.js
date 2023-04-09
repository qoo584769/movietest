const modelMovieInfo = require('@/models/modelMovieInfo')

const controllerMovieInfo = {
  async get (req, res, next) {
    const result = await modelMovieInfo.find()
    console.log(result)
    return result
  },
  async post (req, res, next) {
    const data = {
      name: '鈴芽之旅',
      img: ['https://www.miramarcinemas.tw/MiramarRes/9ac4901d-b92e-4ff0-96de-111b85e9e5c5.jpg'],
      status: ['上映中'],
      box_office: 12345678,
      // 預告片
      trailer: 'https://www.youtube.com/watch?v=TGpl-tz99fA',
      // 分級
      rating: ['普遍級'],
      release_date: new Date(2023, 2, 3),
      language: '日語中字',
      // 廳別
      auditorium: ['A廳', 'B廳', 'C廳'],
      // 電影種類
      genre: ['動畫', '奇幻'],
      // 放映版本
      edition: ['數位', '數位3D', '4DX'],
      director: '新海城',
      actor: ['(聲優)原菜乃華', '松村北斗', '深津繪里', '染谷將太', '伊藤沙莉', '花澤香菜'],
      // 片長
      run_time: '122分鐘',
      // 場次
      show_time: ['06:10', '08:20', '10:30', '12:40', '14:50', '17:00', '19:10', '21:20', '23:30'],
      // 電影簡介
      synopsis: '★ 日本首週末賣破18.8億，超越《你的名字。》《天氣之子》打破新海誠導演個人開片票房紀 錄 ★ 蟬聯日本票房3週冠軍，票房突破94億 ★ 《你的名字。》《天氣之子》導演新海誠最新作品 ★ 日本搖滾天團 RADWIMPS 攜手《攻殼機動隊SAC_2045》作曲家陣內一真打造動人配樂 ★ 1700人海選脫穎而出新生代女演員 原菜乃華 X 「SixTONES」成員 松村北斗 獻聲演出男女 主角 ★ 集結深津繪里、染谷將太、伊藤沙莉、花瀬琴音、花澤香菜等超人氣演員及聲優陣容擔綱配 音 ★ TikTok 歌手「十明」感動獻唱主題曲《すずめ》 ★ 門的另一端，存在著所有的時間―― 　　生活在九州鄉間的17歲少女鈴芽（原菜乃華 配音），某日遇到一名「為了尋找門」而四處旅行的神祕青年草太（松村北斗 配音）。好奇的鈴芽尾隨草太進入山中的廢墟後，在那裡發現了一扇宛如遭逢崩塌毀壞後，所留下的陳舊之門。受到某種神祕力量的吸引，鈴芽將手伸向了那扇門……。 不久之後，日本各地開始出現類似的「門」，如果未能及時將門關上，存在於門另一端的災厄將降臨於現世。繁星、夕陽、和拂曉時分――鈴芽踏入的迷途之境，有著彷彿將所有時間融合在一起的天空……。 於是，在神祕之門的引導下，鈴芽踏上了一段奇妙的“關門之旅”……。 '
    }
    // console.log(data)
    const result = await modelMovieInfo.create(data)
    console.log(result)
    return req.body
  }
}

module.exports = controllerMovieInfo
