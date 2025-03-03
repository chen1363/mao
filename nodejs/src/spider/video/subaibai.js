// import {  Crypto, load, _  } from "../../util/cat.js";
import req from '../../util/req.js';

import Crypto from 'crypto-js';
import { load } from 'cheerio';

import pkg from 'lodash';
const { _ } = pkg;

let key = "素白白",
    url = "https://www.subaibaiys.com",
    siteKey = "",
    siteType = 0,
    cookie = {};
const UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1";


async function request(reqUrl, referer, mth, data, hd) {
    var headers = {
        "User-Agent": UA,
        Cookie: cookie
    };
    let resp = await req(reqUrl, {
            method: mth || "get",
            headers: headers,
            data: data,
            postType: "post" === mth ? "form" : ""
        })
    return resp.data;
}
async function init(inReq, _outResp) {
    // siteKey = cfg.skey, siteType = cfg.stype
    await sliderBypass(url);
    return {};
}

//滑动验证
async function sliderBypass(url) {
    const pro = await req(url + '/',{
                    headers: {
                        'User-Agent': UA,
                        Referer: url + '/',
                    },
                });
    let proData = pro.data;
    if (proData) {
        const $ = load(proData)
        if ($('title').text() === '滑动验证') {
            let slide_js = url + $('body script').attr('src');
            let slide_js_res = await req(slide_js,{
                    headers: {
                        'User-Agent': UA,
                        Referer: url + '/',
                    },
                });
            let vd_url = url + slide_js_res.data.match(/\/a20be899_96a6_40b2_88ba_32f1f75f1552_yanzheng_huadong\.php\?type=.*?&key=/)[0];
            let [, key, value] = slide_js_res.data.match(/key="(.*?)",value="(.*?)";/);
            vd_url = vd_url + `${key}&value=${md5encode(stringtoHex(value))}`;
            let vd_res = await req(vd_url,{
                    headers: {
                        'User-Agent': UA,
                        Referer: url + '/',
                    },
                });
            cookie = vd_res.headers['set-cookie']?.[0].split(';')?.[0] ?? vd_res.headers['Set-Cookie']?.[0].split(';')?.[0];
        }
    }
    
    function stringtoHex(acSTR) {
        var val = '';
        for (var i = 0; i <= acSTR.length - 1; i++) {
            var str = acSTR.charAt(i);
            var code = str.charCodeAt();
            val += parseInt(code) + 1;
        }
        return val;
    }
    function md5encode(word) {
        return Crypto.MD5(word).toString();
    }
}


async function home(inReq,_outResp){
    return JSON.stringify({class:[{type_id:"movie_bt",type_name:"影视筛选"},{type_id:"new-movie",type_name:"电影"},{type_id:"tv-drama",type_name:"电视剧"},{type_id:"hot-month",type_name:"热门电影"},{type_id:"high-movie",type_name:"高分电影"},{type_id:"cartoon-movie",type_name:"动漫电影"},{type_id:"hongkong-movie",type_name:"香港经典电影"},{type_id:"domestic-drama",type_name:"国产剧"},{type_id:"american-drama",type_name:"欧美剧"},{type_id:"korean-drama",type_name:"韩剧"},{type_id:"anime-drama",type_name:"动漫剧"},{type_id:"marvel-movies",type_name:"漫威宇宙电影系列"},{type_id:"fastfurious",type_name:"速度与激情电影系列"},{type_id:"zero-zero-seven",type_name:"007系列(25部正传+2部外传)"}],filters:{movie_bt:[{key:"catedd",name:"分类",value:[{n:"全部",v:""},{v:"/movie_bt_series/dongmanju",n:"动漫剧"},{v:"/movie_bt_series/dongmandy",n:"动漫电影"},{v:"/movie_bt_series/yindudy",n:"印度电影"},{v:"/movie_bt_series/guochanju",n:"国产剧"},{v:"/movie_bt_series/guochandy",n:"国产电影"},{v:"/movie_bt_series/riju",n:"日剧"},{v:"/movie_bt_series/rihandy",n:"日韩电影"},{v:"/movie_bt_series/oumeiju",n:"欧美剧"},{v:"/movie_bt_series/oumeidy",n:"欧美电影"},{v:"/movie_bt_series/taiju",n:"泰剧"},{v:"/movie_bt_series/thaidy",n:"泰国电影"},{v:"/movie_bt_series/gangju",n:"港台剧"},{v:"/movie_bt_series/gangtaidy",n:"港台电影"},{v:"/movie_bt_series/documentary",n:"纪录片"},{v:"/movie_bt_series/zongyi",n:"综艺"},{v:"/movie_bt_series/hanju",n:"韩剧"},{v:"/movie_bt_series/xianggangdy",n:"香港经典电影"}]},{key:"class",name:"类型",value:[{n:"全部",v:""},{v:"/movie_bt_tags/pop-popular",n:"POP流行"},{v:"/movie_bt_tags/biography",n:"传记"},{v:"/movie_bt_tags/child",n:"儿童"},{v:"/movie_bt_tags/adventure",n:"冒险"},{v:"/movie_bt_tags/plot",n:"剧情"},{v:"/movie_bt_tags/action",n:"动作"},{v:"/movie_bt_tags/anime",n:"动漫"},{v:"/movie_bt_tags/animation",n:"动画"},{v:"/movie_bt_tags/history",n:"历史"},{v:"/movie_bt_tags/costume",n:"古装"},{v:"/movie_bt_tags/antiquity",n:"古风"},{v:"/movie_bt_tags/homosexual",n:"同性"},{v:"/movie_bt_tags/comedy",n:"喜剧"},{v:"/movie_bt_tags/fantasy",n:"奇幻"},{v:"/movie_bt_tags/family",n:"家庭"},{v:"/movie_bt_tags/terror",n:"恐怖"},{v:"/movie_bt_tags/suspense",n:"悬疑"},{v:"/movie_bt_tags/erotic",n:"情色"},{v:"/movie_bt_tags/thriller",n:"惊悚"},{v:"/movie_bt_tags/drama",n:"戏曲"},{v:"/movie_bt_tags/war",n:"战争"},{v:"/movie_bt_tags/latin",n:"拉丁"},{v:"/movie_bt_tags/funny",n:"搞笑"},{v:"/movie_bt_tags/campus",n:"校园"},{v:"/movie_bt_tags/song-and-dance",n:"歌舞"},{v:"/movie_bt_tags/martial-arts",n:"武侠"},{v:"/movie_bt_tags/disaster",n:"灾难"},{v:"/movie_bt_tags/love",n:"爱情"},{v:"/movie_bt_tags/crime",n:"犯罪"},{v:"/movie_bt_tags/fancy",n:"玄幻"},{v:"/movie_bt_tags/reality-show",n:"真人秀"},{v:"/movie_bt_tags/short-film",n:"短片"},{v:"/movie_bt_tags/kehuan",n:"科幻"},{v:"/movie_bt_tags/documentary",n:"纪录片"},{v:"/movie_bt_tags/talkshow",n:"脱口秀"},{v:"/movie_bt_tags/stageart",n:"舞台艺术"},{v:"/movie_bt_tags/west",n:"西部"},{v:"/movie_bt_tags/sport",n:"运动"},{v:"/movie_bt_tags/youth",n:"青春"},{v:"/movie_bt_tags/music",n:"音乐"},{v:"/movie_bt_tags/ghost",n:"鬼怪"},{v:"/movie_bt_tags/black-film",n:"黑色电影"}]},{key:"area",name:"地区",value:[{n:"全部",v:""},{v:"/movie_bt_cat/bhutan",n:"不丹"},{v:"/movie_bt_cat/china",n:"中国"},{v:"/movie_bt_cat/china-taiwan",n:"中国台湾"},{v:"/movie_bt_cat/china-mainland",n:"中国大陆"},{v:"/movie_bt_cat/china-hongkong",n:"中国香港"},{v:"/movie_bt_cat/denmark",n:"丹麦"},{v:"/movie_bt_cat/ukraine",n:"乌克兰"},{v:"/movie_bt_cat/uruguay",n:"乌拉圭"},{v:"/movie_bt_cat/israel",n:"以色列"},{v:"/movie_bt_cat/iraq",n:"伊拉克"},{v:"/movie_bt_cat/iran",n:"伊朗"},{v:"/movie_bt_cat/russia",n:"俄罗斯"},{v:"/movie_bt_cat/bulgaria",n:"保加利亚"},{v:"/movie_bt_cat/croatia",n:"克罗地亚"},{v:"/movie_bt_cat/iceland",n:"冰岛"},{v:"/movie_bt_cat/canada",n:"加拿大"},{v:"/movie_bt_cat/hungary",n:"匈牙利"},{v:"/movie_bt_cat/south-africa",n:"南非"},{v:"/movie_bt_cat/botswana",n:"博茨瓦纳"},{v:"/movie_bt_cat/qatar",n:"卡塔尔"},{v:"/movie_bt_cat/luxembourg",n:"卢森堡"},{v:"/movie_bt_cat/india",n:"印度"},{v:"/movie_bt_cat/indonesia",n:"印度尼西亚"},{v:"/movie_bt_cat/kazakhstan",n:"哈萨克斯坦"},{v:"/movie_bt_cat/colombia",n:"哥伦比亚"},{v:"/movie_bt_cat/turkey",n:"土耳其"},{v:"/movie_bt_cat/serbia",n:"塞尔维亚"},{v:"/movie_bt_cat/cyprus",n:"塞浦路斯"},{v:"/movie_bt_cat/mexico",n:"墨西哥"},{v:"/movie_bt_cat/dominica",n:"多米尼加"},{v:"/movie_bt_cat/austria",n:"奥地利"},{v:"/movie_bt_cat/venezuela",n:"委内瑞拉"},{v:"/movie_bt_cat/nigeria",n:"尼日利亚"},{v:"/movie_bt_cat/巴基斯坦",n:"巴基斯坦"},{v:"/movie_bt_cat/paraguay",n:"巴拉圭"},{v:"/movie_bt_cat/brazil",n:"巴西"},{v:"/movie_bt_cat/greece",n:"希腊"},{v:"/movie_bt_cat/germany",n:"德国"},{v:"/movie_bt_cat/italy",n:"意大利"},{v:"/movie_bt_cat/latvia",n:"拉脱维亚"},{v:"/movie_bt_cat/norway",n:"挪威"},{v:"/movie_bt_cat/chech",n:"捷克"},{v:"/movie_bt_cat/摩洛哥",n:"摩洛哥"},{v:"/movie_bt_cat/斯洛伐克",n:"斯洛伐克"},{v:"/movie_bt_cat/slovenia",n:"斯洛文尼亚"},{v:"/movie_bt_cat/singapore",n:"新加坡"},{v:"/movie_bt_cat/zealand",n:"新西兰"},{v:"/movie_bt_cat/japan",n:"日本"},{v:"/movie_bt_cat/chile",n:"智利"},{v:"/movie_bt_cat/north-korea",n:"朝鲜"},{v:"/movie_bt_cat/cambodia",n:"柬埔寨"},{v:"/movie_bt_cat/georgia",n:"格鲁吉亚"},{v:"/movie_bt_cat/belgium",n:"比利时"},{v:"/movie_bt_cat/saudi-arabia",n:"沙特阿拉伯"},{v:"/movie_bt_cat/france",n:"法国"},{v:"/movie_bt_cat/poland",n:"波兰"},{v:"/movie_bt_cat/puertorco",n:"波多黎各"},{v:"/movie_bt_cat/bohei",n:"波黑"},{v:"/movie_bt_cat/thailand",n:"泰国"},{v:"/movie_bt_cat/australia",n:"澳大利亚"},{v:"/movie_bt_cat/ireland",n:"爱尔兰"},{v:"/movie_bt_cat/estonia",n:"爱沙尼亚"},{v:"/movie_bt_cat/sweden",n:"瑞典"},{v:"/movie_bt_cat/switzerland",n:"瑞士"},{v:"/movie_bt_cat/belarus",n:"白俄罗斯"},{v:"/movie_bt_cat/peru",n:"秘鲁"},{v:"/movie_bt_cat/tunisia",n:"突尼斯"},{v:"/movie_bt_cat/lithuania",n:"立陶宛"},{v:"/movie_bt_cat/romania",n:"罗马尼亚"},{v:"/movie_bt_cat/america",n:"美国"},{v:"/movie_bt_cat/finland",n:"芬兰"},{v:"/movie_bt_cat/sovietunion",n:"苏联"},{v:"/movie_bt_cat/england",n:"英国"},{v:"/movie_bt_cat/netherlands",n:"荷兰"},{v:"/movie_bt_cat/philippines",n:"菲律宾"},{v:"/movie_bt_cat/葡萄牙",n:"葡萄牙"},{v:"/movie_bt_cat/west-germany",n:"西德"},{v:"/movie_bt_cat/spain",n:"西班牙"},{v:"/movie_bt_cat/vietnam",n:"越南"},{v:"/movie_bt_cat/argentina",n:"阿根廷"},{v:"/movie_bt_cat/korea",n:"韩国"},{v:"/movie_bt_cat/malaysia",n:"马来西亚"},{v:"/movie_bt_cat/马耳他",n:"马耳他"}]},{key:"year",name:"年份",value:[{n:"全部",v:""},{v:"/year/2024",n:"2024"},{v:"/year/2023",n:"2023"},{v:"/year/2022",n:"2022"},{v:"/year/2021",n:"2021"},{v:"/year/2020",n:"2020"},{v:"/year/2019",n:"2019"},{v:"/year/2018",n:"2018"},{v:"/year/2017",n:"2017"},{v:"/year/2016",n:"2016"},{v:"/year/2015",n:"2015"},{v:"/year/2014",n:"2014"},{v:"/year/2013",n:"2013"},{v:"/year/2012",n:"2012"},{v:"/year/2011",n:"2011"},{v:"/year/2010",n:"2010"},{v:"/year/2009",n:"2009"},{v:"/year/2008",n:"2008"},{v:"/year/2007",n:"2007"},{v:"/year/2006",n:"2006"},{v:"/year/2005",n:"2005"},{v:"/year/2004",n:"2004"},{v:"/year/2003",n:"2003"},{v:"/year/2002",n:"2002"},{v:"/year/2001",n:"2001"},{v:"/year/2000",n:"2000"},{v:"/year/1999",n:"1999"},{v:"/year/1998",n:"1998"},{v:"/year/1997",n:"1997"},{v:"/year/1996",n:"1996"},{v:"/year/1995",n:"1995"},{v:"/year/1994",n:"1994"},{v:"/year/1993",n:"1993"},{v:"/year/1992",n:"1992"},{v:"/year/1991",n:"1991"},{v:"/year/1990",n:"1990"},{v:"/year/1989",n:"1989"},{v:"/year/1988",n:"1988"},{v:"/year/1987",n:"1987"},{v:"/year/1986",n:"1986"},{v:"/year/1985",n:"1985"},{v:"/year/1984",n:"1984"},{v:"/year/1983",n:"1983"},{v:"/year/1982",n:"1982"},{v:"/year/1981",n:"1981"},{v:"/year/1980",n:"1980"},{v:"/year/1979",n:"1979"},{v:"/year/1978",n:"1978"},{v:"/year/1977",n:"1977"},{v:"/year/1976",n:"1976"},{v:"/year/1975",n:"1975"},{v:"/year/1974",n:"1974"},{v:"/year/1973",n:"1973"},{v:"/year/1972",n:"1972"},{v:"/year/1971",n:"1971"},{v:"/year/1970",n:"1970"},{v:"/year/1969",n:"1969"},{v:"/year/1968",n:"1968"},{v:"/year/1967",n:"1967"},{v:"/year/1966",n:"1966"},{v:"/year/1965",n:"1965"},{v:"/year/1964",n:"1964"},{v:"/year/1963",n:"1963"},{v:"/year/1962",n:"1962"},{v:"/year/1960",n:"1960"},{v:"/year/1959",n:"1959"},{v:"/year/1954",n:"1954"},{v:"/year/1952",n:"1952"},{v:"/year/1950",n:"1950"},{v:"/year/1949",n:"1949"},{v:"/year/1948",n:"1948"},{v:"/year/1940",n:"1940"},{v:"/year/1939",n:"1939"},{v:"/year/1925",n:"1925"}]}],"new-movie":[{key:"class",name:"类型",value:[{n:"全部",v:""},{v:"/movie_bt_tags/pop-popular",n:"POP流行"},{v:"/movie_bt_tags/biography",n:"传记"},{v:"/movie_bt_tags/child",n:"儿童"},{v:"/movie_bt_tags/adventure",n:"冒险"},{v:"/movie_bt_tags/plot",n:"剧情"},{v:"/movie_bt_tags/action",n:"动作"},{v:"/movie_bt_tags/anime",n:"动漫"},{v:"/movie_bt_tags/animation",n:"动画"},{v:"/movie_bt_tags/history",n:"历史"},{v:"/movie_bt_tags/costume",n:"古装"},{v:"/movie_bt_tags/antiquity",n:"古风"},{v:"/movie_bt_tags/homosexual",n:"同性"},{v:"/movie_bt_tags/comedy",n:"喜剧"},{v:"/movie_bt_tags/fantasy",n:"奇幻"},{v:"/movie_bt_tags/family",n:"家庭"},{v:"/movie_bt_tags/terror",n:"恐怖"},{v:"/movie_bt_tags/suspense",n:"悬疑"},{v:"/movie_bt_tags/erotic",n:"情色"},{v:"/movie_bt_tags/thriller",n:"惊悚"},{v:"/movie_bt_tags/drama",n:"戏曲"},{v:"/movie_bt_tags/war",n:"战争"},{v:"/movie_bt_tags/latin",n:"拉丁"},{v:"/movie_bt_tags/funny",n:"搞笑"},{v:"/movie_bt_tags/campus",n:"校园"},{v:"/movie_bt_tags/song-and-dance",n:"歌舞"},{v:"/movie_bt_tags/martial-arts",n:"武侠"},{v:"/movie_bt_tags/disaster",n:"灾难"},{v:"/movie_bt_tags/love",n:"爱情"},{v:"/movie_bt_tags/crime",n:"犯罪"},{v:"/movie_bt_tags/fancy",n:"玄幻"},{v:"/movie_bt_tags/reality-show",n:"真人秀"},{v:"/movie_bt_tags/short-film",n:"短片"},{v:"/movie_bt_tags/kehuan",n:"科幻"},{v:"/movie_bt_tags/documentary",n:"纪录片"},{v:"/movie_bt_tags/talkshow",n:"脱口秀"},{v:"/movie_bt_tags/stageart",n:"舞台艺术"},{v:"/movie_bt_tags/west",n:"西部"},{v:"/movie_bt_tags/sport",n:"运动"},{v:"/movie_bt_tags/youth",n:"青春"},{v:"/movie_bt_tags/music",n:"音乐"},{v:"/movie_bt_tags/ghost",n:"鬼怪"},{v:"/movie_bt_tags/black-film",n:"黑色电影"}]},{key:"year",name:"年份",value:[{n:"全部",v:""},{v:"/year/2024",n:"2024"},{v:"/year/2023",n:"2023"},{v:"/year/2022",n:"2022"},{v:"/year/2021",n:"2021"},{v:"/year/2020",n:"2020"},{v:"/year/2019",n:"2019"},{v:"/year/2018",n:"2018"},{v:"/year/2017",n:"2017"},{v:"/year/2016",n:"2016"},{v:"/year/2015",n:"2015"},{v:"/year/2014",n:"2014"},{v:"/year/2013",n:"2013"},{v:"/year/2012",n:"2012"},{v:"/year/2011",n:"2011"},{v:"/year/2010",n:"2010"},{v:"/year/2009",n:"2009"},{v:"/year/2008",n:"2008"},{v:"/year/2007",n:"2007"},{v:"/year/2006",n:"2006"},{v:"/year/2005",n:"2005"},{v:"/year/2004",n:"2004"},{v:"/year/2003",n:"2003"},{v:"/year/2002",n:"2002"},{v:"/year/2001",n:"2001"},{v:"/year/2000",n:"2000"},{v:"/year/1999",n:"1999"},{v:"/year/1998",n:"1998"},{v:"/year/1997",n:"1997"},{v:"/year/1996",n:"1996"},{v:"/year/1995",n:"1995"},{v:"/year/1994",n:"1994"},{v:"/year/1993",n:"1993"},{v:"/year/1992",n:"1992"},{v:"/year/1991",n:"1991"},{v:"/year/1990",n:"1990"},{v:"/year/1989",n:"1989"},{v:"/year/1988",n:"1988"},{v:"/year/1987",n:"1987"},{v:"/year/1986",n:"1986"},{v:"/year/1985",n:"1985"},{v:"/year/1984",n:"1984"},{v:"/year/1983",n:"1983"},{v:"/year/1982",n:"1982"},{v:"/year/1981",n:"1981"},{v:"/year/1980",n:"1980"},{v:"/year/1979",n:"1979"},{v:"/year/1978",n:"1978"},{v:"/year/1977",n:"1977"},{v:"/year/1976",n:"1976"},{v:"/year/1975",n:"1975"},{v:"/year/1974",n:"1974"},{v:"/year/1973",n:"1973"},{v:"/year/1972",n:"1972"},{v:"/year/1971",n:"1971"},{v:"/year/1970",n:"1970"},{v:"/year/1969",n:"1969"},{v:"/year/1968",n:"1968"},{v:"/year/1967",n:"1967"},{v:"/year/1966",n:"1966"},{v:"/year/1965",n:"1965"},{v:"/year/1964",n:"1964"},{v:"/year/1963",n:"1963"},{v:"/year/1962",n:"1962"},{v:"/year/1960",n:"1960"},{v:"/year/1959",n:"1959"},{v:"/year/1954",n:"1954"},{v:"/year/1952",n:"1952"},{v:"/year/1950",n:"1950"},{v:"/year/1949",n:"1949"},{v:"/year/1948",n:"1948"},{v:"/year/1940",n:"1940"},{v:"/year/1939",n:"1939"},{v:"/year/1925",n:"1925"}]}],"tv-drama":[{key:"class",name:"类型",value:[{n:"全部",v:""},{v:"/movie_bt_tags/pop-popular",n:"POP流行"},{v:"/movie_bt_tags/biography",n:"传记"},{v:"/movie_bt_tags/child",n:"儿童"},{v:"/movie_bt_tags/adventure",n:"冒险"},{v:"/movie_bt_tags/plot",n:"剧情"},{v:"/movie_bt_tags/action",n:"动作"},{v:"/movie_bt_tags/anime",n:"动漫"},{v:"/movie_bt_tags/animation",n:"动画"},{v:"/movie_bt_tags/history",n:"历史"},{v:"/movie_bt_tags/costume",n:"古装"},{v:"/movie_bt_tags/antiquity",n:"古风"},{v:"/movie_bt_tags/homosexual",n:"同性"},{v:"/movie_bt_tags/comedy",n:"喜剧"},{v:"/movie_bt_tags/fantasy",n:"奇幻"},{v:"/movie_bt_tags/family",n:"家庭"},{v:"/movie_bt_tags/terror",n:"恐怖"},{v:"/movie_bt_tags/suspense",n:"悬疑"},{v:"/movie_bt_tags/erotic",n:"情色"},{v:"/movie_bt_tags/thriller",n:"惊悚"},{v:"/movie_bt_tags/drama",n:"戏曲"},{v:"/movie_bt_tags/war",n:"战争"},{v:"/movie_bt_tags/latin",n:"拉丁"},{v:"/movie_bt_tags/funny",n:"搞笑"},{v:"/movie_bt_tags/campus",n:"校园"},{v:"/movie_bt_tags/song-and-dance",n:"歌舞"},{v:"/movie_bt_tags/martial-arts",n:"武侠"},{v:"/movie_bt_tags/disaster",n:"灾难"},{v:"/movie_bt_tags/love",n:"爱情"},{v:"/movie_bt_tags/crime",n:"犯罪"},{v:"/movie_bt_tags/fancy",n:"玄幻"},{v:"/movie_bt_tags/reality-show",n:"真人秀"},{v:"/movie_bt_tags/short-film",n:"短片"},{v:"/movie_bt_tags/kehuan",n:"科幻"},{v:"/movie_bt_tags/documentary",n:"纪录片"},{v:"/movie_bt_tags/talkshow",n:"脱口秀"},{v:"/movie_bt_tags/stageart",n:"舞台艺术"},{v:"/movie_bt_tags/west",n:"西部"},{v:"/movie_bt_tags/sport",n:"运动"},{v:"/movie_bt_tags/youth",n:"青春"},{v:"/movie_bt_tags/music",n:"音乐"},{v:"/movie_bt_tags/ghost",n:"鬼怪"},{v:"/movie_bt_tags/black-film",n:"黑色电影"}]},{key:"year",name:"年份",value:[{n:"全部",v:""},{v:"/year/2024",n:"2024"},{v:"/year/2023",n:"2023"},{v:"/year/2022",n:"2022"},{v:"/year/2021",n:"2021"},{v:"/year/2020",n:"2020"},{v:"/year/2019",n:"2019"},{v:"/year/2018",n:"2018"},{v:"/year/2017",n:"2017"},{v:"/year/2016",n:"2016"},{v:"/year/2015",n:"2015"},{v:"/year/2014",n:"2014"},{v:"/year/2013",n:"2013"},{v:"/year/2012",n:"2012"},{v:"/year/2011",n:"2011"},{v:"/year/2010",n:"2010"},{v:"/year/2009",n:"2009"},{v:"/year/2008",n:"2008"},{v:"/year/2007",n:"2007"},{v:"/year/2006",n:"2006"},{v:"/year/2005",n:"2005"},{v:"/year/2004",n:"2004"},{v:"/year/2003",n:"2003"},{v:"/year/2002",n:"2002"},{v:"/year/2001",n:"2001"},{v:"/year/2000",n:"2000"},{v:"/year/1999",n:"1999"},{v:"/year/1998",n:"1998"},{v:"/year/1997",n:"1997"},{v:"/year/1996",n:"1996"},{v:"/year/1995",n:"1995"},{v:"/year/1994",n:"1994"},{v:"/year/1993",n:"1993"},{v:"/year/1992",n:"1992"},{v:"/year/1991",n:"1991"},{v:"/year/1990",n:"1990"},{v:"/year/1989",n:"1989"},{v:"/year/1988",n:"1988"},{v:"/year/1987",n:"1987"},{v:"/year/1986",n:"1986"},{v:"/year/1985",n:"1985"},{v:"/year/1984",n:"1984"},{v:"/year/1983",n:"1983"},{v:"/year/1982",n:"1982"},{v:"/year/1981",n:"1981"},{v:"/year/1980",n:"1980"},{v:"/year/1979",n:"1979"},{v:"/year/1978",n:"1978"},{v:"/year/1977",n:"1977"},{v:"/year/1976",n:"1976"},{v:"/year/1975",n:"1975"},{v:"/year/1974",n:"1974"},{v:"/year/1973",n:"1973"},{v:"/year/1972",n:"1972"},{v:"/year/1971",n:"1971"},{v:"/year/1970",n:"1970"},{v:"/year/1969",n:"1969"},{v:"/year/1968",n:"1968"},{v:"/year/1967",n:"1967"},{v:"/year/1966",n:"1966"},{v:"/year/1965",n:"1965"},{v:"/year/1964",n:"1964"},{v:"/year/1963",n:"1963"},{v:"/year/1962",n:"1962"},{v:"/year/1960",n:"1960"},{v:"/year/1959",n:"1959"},{v:"/year/1954",n:"1954"},{v:"/year/1952",n:"1952"},{v:"/year/1950",n:"1950"},{v:"/year/1949",n:"1949"},{v:"/year/1948",n:"1948"},{v:"/year/1940",n:"1940"},{v:"/year/1939",n:"1939"},{v:"/year/1925",n:"1925"}]}],"hot-month":[{key:"class",name:"类型",value:[{n:"全部",v:""},{v:"/movie_bt_tags/pop-popular",n:"POP流行"},{v:"/movie_bt_tags/biography",n:"传记"},{v:"/movie_bt_tags/child",n:"儿童"},{v:"/movie_bt_tags/adventure",n:"冒险"},{v:"/movie_bt_tags/plot",n:"剧情"},{v:"/movie_bt_tags/action",n:"动作"},{v:"/movie_bt_tags/anime",n:"动漫"},{v:"/movie_bt_tags/animation",n:"动画"},{v:"/movie_bt_tags/history",n:"历史"},{v:"/movie_bt_tags/costume",n:"古装"},{v:"/movie_bt_tags/antiquity",n:"古风"},{v:"/movie_bt_tags/homosexual",n:"同性"},{v:"/movie_bt_tags/comedy",n:"喜剧"},{v:"/movie_bt_tags/fantasy",n:"奇幻"},{v:"/movie_bt_tags/family",n:"家庭"},{v:"/movie_bt_tags/terror",n:"恐怖"},{v:"/movie_bt_tags/suspense",n:"悬疑"},{v:"/movie_bt_tags/erotic",n:"情色"},{v:"/movie_bt_tags/thriller",n:"惊悚"},{v:"/movie_bt_tags/drama",n:"戏曲"},{v:"/movie_bt_tags/war",n:"战争"},{v:"/movie_bt_tags/latin",n:"拉丁"},{v:"/movie_bt_tags/funny",n:"搞笑"},{v:"/movie_bt_tags/campus",n:"校园"},{v:"/movie_bt_tags/song-and-dance",n:"歌舞"},{v:"/movie_bt_tags/martial-arts",n:"武侠"},{v:"/movie_bt_tags/disaster",n:"灾难"},{v:"/movie_bt_tags/love",n:"爱情"},{v:"/movie_bt_tags/crime",n:"犯罪"},{v:"/movie_bt_tags/fancy",n:"玄幻"},{v:"/movie_bt_tags/reality-show",n:"真人秀"},{v:"/movie_bt_tags/short-film",n:"短片"},{v:"/movie_bt_tags/kehuan",n:"科幻"},{v:"/movie_bt_tags/documentary",n:"纪录片"},{v:"/movie_bt_tags/talkshow",n:"脱口秀"},{v:"/movie_bt_tags/stageart",n:"舞台艺术"},{v:"/movie_bt_tags/west",n:"西部"},{v:"/movie_bt_tags/sport",n:"运动"},{v:"/movie_bt_tags/youth",n:"青春"},{v:"/movie_bt_tags/music",n:"音乐"},{v:"/movie_bt_tags/ghost",n:"鬼怪"},{v:"/movie_bt_tags/black-film",n:"黑色电影"}]},{key:"year",name:"年份",value:[{n:"全部",v:""},{v:"/year/2024",n:"2024"},{v:"/year/2023",n:"2023"},{v:"/year/2022",n:"2022"},{v:"/year/2021",n:"2021"},{v:"/year/2020",n:"2020"},{v:"/year/2019",n:"2019"},{v:"/year/2018",n:"2018"},{v:"/year/2017",n:"2017"},{v:"/year/2016",n:"2016"},{v:"/year/2015",n:"2015"},{v:"/year/2014",n:"2014"},{v:"/year/2013",n:"2013"},{v:"/year/2012",n:"2012"},{v:"/year/2011",n:"2011"},{v:"/year/2010",n:"2010"},{v:"/year/2009",n:"2009"},{v:"/year/2008",n:"2008"},{v:"/year/2007",n:"2007"},{v:"/year/2006",n:"2006"},{v:"/year/2005",n:"2005"},{v:"/year/2004",n:"2004"},{v:"/year/2003",n:"2003"},{v:"/year/2002",n:"2002"},{v:"/year/2001",n:"2001"},{v:"/year/2000",n:"2000"},{v:"/year/1999",n:"1999"},{v:"/year/1998",n:"1998"},{v:"/year/1997",n:"1997"},{v:"/year/1996",n:"1996"},{v:"/year/1995",n:"1995"},{v:"/year/1994",n:"1994"},{v:"/year/1993",n:"1993"},{v:"/year/1992",n:"1992"},{v:"/year/1991",n:"1991"},{v:"/year/1990",n:"1990"},{v:"/year/1989",n:"1989"},{v:"/year/1988",n:"1988"},{v:"/year/1987",n:"1987"},{v:"/year/1986",n:"1986"},{v:"/year/1985",n:"1985"},{v:"/year/1984",n:"1984"},{v:"/year/1983",n:"1983"},{v:"/year/1982",n:"1982"},{v:"/year/1981",n:"1981"},{v:"/year/1980",n:"1980"},{v:"/year/1979",n:"1979"},{v:"/year/1978",n:"1978"},{v:"/year/1977",n:"1977"},{v:"/year/1976",n:"1976"},{v:"/year/1975",n:"1975"},{v:"/year/1974",n:"1974"},{v:"/year/1973",n:"1973"},{v:"/year/1972",n:"1972"},{v:"/year/1971",n:"1971"},{v:"/year/1970",n:"1970"},{v:"/year/1969",n:"1969"},{v:"/year/1968",n:"1968"},{v:"/year/1967",n:"1967"},{v:"/year/1966",n:"1966"},{v:"/year/1965",n:"1965"},{v:"/year/1964",n:"1964"},{v:"/year/1963",n:"1963"},{v:"/year/1962",n:"1962"},{v:"/year/1960",n:"1960"},{v:"/year/1959",n:"1959"},{v:"/year/1954",n:"1954"},{v:"/year/1952",n:"1952"},{v:"/year/1950",n:"1950"},{v:"/year/1949",n:"1949"},{v:"/year/1948",n:"1948"},{v:"/year/1940",n:"1940"},{v:"/year/1939",n:"1939"},{v:"/year/1925",n:"1925"}]}],"high-movie":[{key:"class",name:"类型",value:[{n:"全部",v:""},{v:"/movie_bt_tags/pop-popular",n:"POP流行"},{v:"/movie_bt_tags/biography",n:"传记"},{v:"/movie_bt_tags/child",n:"儿童"},{v:"/movie_bt_tags/adventure",n:"冒险"},{v:"/movie_bt_tags/plot",n:"剧情"},{v:"/movie_bt_tags/action",n:"动作"},{v:"/movie_bt_tags/anime",n:"动漫"},{v:"/movie_bt_tags/animation",n:"动画"},{v:"/movie_bt_tags/history",n:"历史"},{v:"/movie_bt_tags/costume",n:"古装"},{v:"/movie_bt_tags/antiquity",n:"古风"},{v:"/movie_bt_tags/homosexual",n:"同性"},{v:"/movie_bt_tags/comedy",n:"喜剧"},{v:"/movie_bt_tags/fantasy",n:"奇幻"},{v:"/movie_bt_tags/family",n:"家庭"},{v:"/movie_bt_tags/terror",n:"恐怖"},{v:"/movie_bt_tags/suspense",n:"悬疑"},{v:"/movie_bt_tags/erotic",n:"情色"},{v:"/movie_bt_tags/thriller",n:"惊悚"},{v:"/movie_bt_tags/drama",n:"戏曲"},{v:"/movie_bt_tags/war",n:"战争"},{v:"/movie_bt_tags/latin",n:"拉丁"},{v:"/movie_bt_tags/funny",n:"搞笑"},{v:"/movie_bt_tags/campus",n:"校园"},{v:"/movie_bt_tags/song-and-dance",n:"歌舞"},{v:"/movie_bt_tags/martial-arts",n:"武侠"},{v:"/movie_bt_tags/disaster",n:"灾难"},{v:"/movie_bt_tags/love",n:"爱情"},{v:"/movie_bt_tags/crime",n:"犯罪"},{v:"/movie_bt_tags/fancy",n:"玄幻"},{v:"/movie_bt_tags/reality-show",n:"真人秀"},{v:"/movie_bt_tags/short-film",n:"短片"},{v:"/movie_bt_tags/kehuan",n:"科幻"},{v:"/movie_bt_tags/documentary",n:"纪录片"},{v:"/movie_bt_tags/talkshow",n:"脱口秀"},{v:"/movie_bt_tags/stageart",n:"舞台艺术"},{v:"/movie_bt_tags/west",n:"西部"},{v:"/movie_bt_tags/sport",n:"运动"},{v:"/movie_bt_tags/youth",n:"青春"},{v:"/movie_bt_tags/music",n:"音乐"},{v:"/movie_bt_tags/ghost",n:"鬼怪"},{v:"/movie_bt_tags/black-film",n:"黑色电影"}]},{key:"year",name:"年份",value:[{n:"全部",v:""},{v:"/year/2024",n:"2024"},{v:"/year/2023",n:"2023"},{v:"/year/2022",n:"2022"},{v:"/year/2021",n:"2021"},{v:"/year/2020",n:"2020"},{v:"/year/2019",n:"2019"},{v:"/year/2018",n:"2018"},{v:"/year/2017",n:"2017"},{v:"/year/2016",n:"2016"},{v:"/year/2015",n:"2015"},{v:"/year/2014",n:"2014"},{v:"/year/2013",n:"2013"},{v:"/year/2012",n:"2012"},{v:"/year/2011",n:"2011"},{v:"/year/2010",n:"2010"},{v:"/year/2009",n:"2009"},{v:"/year/2008",n:"2008"},{v:"/year/2007",n:"2007"},{v:"/year/2006",n:"2006"},{v:"/year/2005",n:"2005"},{v:"/year/2004",n:"2004"},{v:"/year/2003",n:"2003"},{v:"/year/2002",n:"2002"},{v:"/year/2001",n:"2001"},{v:"/year/2000",n:"2000"},{v:"/year/1999",n:"1999"},{v:"/year/1998",n:"1998"},{v:"/year/1997",n:"1997"},{v:"/year/1996",n:"1996"},{v:"/year/1995",n:"1995"},{v:"/year/1994",n:"1994"},{v:"/year/1993",n:"1993"},{v:"/year/1992",n:"1992"},{v:"/year/1991",n:"1991"},{v:"/year/1990",n:"1990"},{v:"/year/1989",n:"1989"},{v:"/year/1988",n:"1988"},{v:"/year/1987",n:"1987"},{v:"/year/1986",n:"1986"},{v:"/year/1985",n:"1985"},{v:"/year/1984",n:"1984"},{v:"/year/1983",n:"1983"},{v:"/year/1982",n:"1982"},{v:"/year/1981",n:"1981"},{v:"/year/1980",n:"1980"},{v:"/year/1979",n:"1979"},{v:"/year/1978",n:"1978"},{v:"/year/1977",n:"1977"},{v:"/year/1976",n:"1976"},{v:"/year/1975",n:"1975"},{v:"/year/1974",n:"1974"},{v:"/year/1973",n:"1973"},{v:"/year/1972",n:"1972"},{v:"/year/1971",n:"1971"},{v:"/year/1970",n:"1970"},{v:"/year/1969",n:"1969"},{v:"/year/1968",n:"1968"},{v:"/year/1967",n:"1967"},{v:"/year/1966",n:"1966"},{v:"/year/1965",n:"1965"},{v:"/year/1964",n:"1964"},{v:"/year/1963",n:"1963"},{v:"/year/1962",n:"1962"},{v:"/year/1960",n:"1960"},{v:"/year/1959",n:"1959"},{v:"/year/1954",n:"1954"},{v:"/year/1952",n:"1952"},{v:"/year/1950",n:"1950"},{v:"/year/1949",n:"1949"},{v:"/year/1948",n:"1948"},{v:"/year/1940",n:"1940"},{v:"/year/1939",n:"1939"},{v:"/year/1925",n:"1925"}]}],"cartoon-movie":[{key:"class",name:"类型",value:[{n:"全部",v:""},{v:"/movie_bt_tags/pop-popular",n:"POP流行"},{v:"/movie_bt_tags/biography",n:"传记"},{v:"/movie_bt_tags/child",n:"儿童"},{v:"/movie_bt_tags/adventure",n:"冒险"},{v:"/movie_bt_tags/plot",n:"剧情"},{v:"/movie_bt_tags/action",n:"动作"},{v:"/movie_bt_tags/anime",n:"动漫"},{v:"/movie_bt_tags/animation",n:"动画"},{v:"/movie_bt_tags/history",n:"历史"},{v:"/movie_bt_tags/costume",n:"古装"},{v:"/movie_bt_tags/antiquity",n:"古风"},{v:"/movie_bt_tags/homosexual",n:"同性"},{v:"/movie_bt_tags/comedy",n:"喜剧"},{v:"/movie_bt_tags/fantasy",n:"奇幻"},{v:"/movie_bt_tags/family",n:"家庭"},{v:"/movie_bt_tags/terror",n:"恐怖"},{v:"/movie_bt_tags/suspense",n:"悬疑"},{v:"/movie_bt_tags/erotic",n:"情色"},{v:"/movie_bt_tags/thriller",n:"惊悚"},{v:"/movie_bt_tags/drama",n:"戏曲"},{v:"/movie_bt_tags/war",n:"战争"},{v:"/movie_bt_tags/latin",n:"拉丁"},{v:"/movie_bt_tags/funny",n:"搞笑"},{v:"/movie_bt_tags/campus",n:"校园"},{v:"/movie_bt_tags/song-and-dance",n:"歌舞"},{v:"/movie_bt_tags/martial-arts",n:"武侠"},{v:"/movie_bt_tags/disaster",n:"灾难"},{v:"/movie_bt_tags/love",n:"爱情"},{v:"/movie_bt_tags/crime",n:"犯罪"},{v:"/movie_bt_tags/fancy",n:"玄幻"},{v:"/movie_bt_tags/reality-show",n:"真人秀"},{v:"/movie_bt_tags/short-film",n:"短片"},{v:"/movie_bt_tags/kehuan",n:"科幻"},{v:"/movie_bt_tags/documentary",n:"纪录片"},{v:"/movie_bt_tags/talkshow",n:"脱口秀"},{v:"/movie_bt_tags/stageart",n:"舞台艺术"},{v:"/movie_bt_tags/west",n:"西部"},{v:"/movie_bt_tags/sport",n:"运动"},{v:"/movie_bt_tags/youth",n:"青春"},{v:"/movie_bt_tags/music",n:"音乐"},{v:"/movie_bt_tags/ghost",n:"鬼怪"},{v:"/movie_bt_tags/black-film",n:"黑色电影"}]},{key:"year",name:"年份",value:[{n:"全部",v:""},{v:"/year/2024",n:"2024"},{v:"/year/2023",n:"2023"},{v:"/year/2022",n:"2022"},{v:"/year/2021",n:"2021"},{v:"/year/2020",n:"2020"},{v:"/year/2019",n:"2019"},{v:"/year/2018",n:"2018"},{v:"/year/2017",n:"2017"},{v:"/year/2016",n:"2016"},{v:"/year/2015",n:"2015"},{v:"/year/2014",n:"2014"},{v:"/year/2013",n:"2013"},{v:"/year/2012",n:"2012"},{v:"/year/2011",n:"2011"},{v:"/year/2010",n:"2010"},{v:"/year/2009",n:"2009"},{v:"/year/2008",n:"2008"},{v:"/year/2007",n:"2007"},{v:"/year/2006",n:"2006"},{v:"/year/2005",n:"2005"},{v:"/year/2004",n:"2004"},{v:"/year/2003",n:"2003"},{v:"/year/2002",n:"2002"},{v:"/year/2001",n:"2001"},{v:"/year/2000",n:"2000"},{v:"/year/1999",n:"1999"},{v:"/year/1998",n:"1998"},{v:"/year/1997",n:"1997"},{v:"/year/1996",n:"1996"},{v:"/year/1995",n:"1995"},{v:"/year/1994",n:"1994"},{v:"/year/1993",n:"1993"},{v:"/year/1992",n:"1992"},{v:"/year/1991",n:"1991"},{v:"/year/1990",n:"1990"},{v:"/year/1989",n:"1989"},{v:"/year/1988",n:"1988"},{v:"/year/1987",n:"1987"},{v:"/year/1986",n:"1986"},{v:"/year/1985",n:"1985"},{v:"/year/1984",n:"1984"},{v:"/year/1983",n:"1983"},{v:"/year/1982",n:"1982"},{v:"/year/1981",n:"1981"},{v:"/year/1980",n:"1980"},{v:"/year/1979",n:"1979"},{v:"/year/1978",n:"1978"},{v:"/year/1977",n:"1977"},{v:"/year/1976",n:"1976"},{v:"/year/1975",n:"1975"},{v:"/year/1974",n:"1974"},{v:"/year/1973",n:"1973"},{v:"/year/1972",n:"1972"},{v:"/year/1971",n:"1971"},{v:"/year/1970",n:"1970"},{v:"/year/1969",n:"1969"},{v:"/year/1968",n:"1968"},{v:"/year/1967",n:"1967"},{v:"/year/1966",n:"1966"},{v:"/year/1965",n:"1965"},{v:"/year/1964",n:"1964"},{v:"/year/1963",n:"1963"},{v:"/year/1962",n:"1962"},{v:"/year/1960",n:"1960"},{v:"/year/1959",n:"1959"},{v:"/year/1954",n:"1954"},{v:"/year/1952",n:"1952"},{v:"/year/1950",n:"1950"},{v:"/year/1949",n:"1949"},{v:"/year/1948",n:"1948"},{v:"/year/1940",n:"1940"},{v:"/year/1939",n:"1939"},{v:"/year/1925",n:"1925"}]}],"hongkong-movie":[{key:"class",name:"类型",value:[{n:"全部",v:""},{v:"/movie_bt_tags/pop-popular",n:"POP流行"},{v:"/movie_bt_tags/biography",n:"传记"},{v:"/movie_bt_tags/child",n:"儿童"},{v:"/movie_bt_tags/adventure",n:"冒险"},{v:"/movie_bt_tags/plot",n:"剧情"},{v:"/movie_bt_tags/action",n:"动作"},{v:"/movie_bt_tags/anime",n:"动漫"},{v:"/movie_bt_tags/animation",n:"动画"},{v:"/movie_bt_tags/history",n:"历史"},{v:"/movie_bt_tags/costume",n:"古装"},{v:"/movie_bt_tags/antiquity",n:"古风"},{v:"/movie_bt_tags/homosexual",n:"同性"},{v:"/movie_bt_tags/comedy",n:"喜剧"},{v:"/movie_bt_tags/fantasy",n:"奇幻"},{v:"/movie_bt_tags/family",n:"家庭"},{v:"/movie_bt_tags/terror",n:"恐怖"},{v:"/movie_bt_tags/suspense",n:"悬疑"},{v:"/movie_bt_tags/erotic",n:"情色"},{v:"/movie_bt_tags/thriller",n:"惊悚"},{v:"/movie_bt_tags/drama",n:"戏曲"},{v:"/movie_bt_tags/war",n:"战争"},{v:"/movie_bt_tags/latin",n:"拉丁"},{v:"/movie_bt_tags/funny",n:"搞笑"},{v:"/movie_bt_tags/campus",n:"校园"},{v:"/movie_bt_tags/song-and-dance",n:"歌舞"},{v:"/movie_bt_tags/martial-arts",n:"武侠"},{v:"/movie_bt_tags/disaster",n:"灾难"},{v:"/movie_bt_tags/love",n:"爱情"},{v:"/movie_bt_tags/crime",n:"犯罪"},{v:"/movie_bt_tags/fancy",n:"玄幻"},{v:"/movie_bt_tags/reality-show",n:"真人秀"},{v:"/movie_bt_tags/short-film",n:"短片"},{v:"/movie_bt_tags/kehuan",n:"科幻"},{v:"/movie_bt_tags/documentary",n:"纪录片"},{v:"/movie_bt_tags/talkshow",n:"脱口秀"},{v:"/movie_bt_tags/stageart",n:"舞台艺术"},{v:"/movie_bt_tags/west",n:"西部"},{v:"/movie_bt_tags/sport",n:"运动"},{v:"/movie_bt_tags/youth",n:"青春"},{v:"/movie_bt_tags/music",n:"音乐"},{v:"/movie_bt_tags/ghost",n:"鬼怪"},{v:"/movie_bt_tags/black-film",n:"黑色电影"}]},{key:"year",name:"年份",value:[{n:"全部",v:""},{v:"/year/2024",n:"2024"},{v:"/year/2023",n:"2023"},{v:"/year/2022",n:"2022"},{v:"/year/2021",n:"2021"},{v:"/year/2020",n:"2020"},{v:"/year/2019",n:"2019"},{v:"/year/2018",n:"2018"},{v:"/year/2017",n:"2017"},{v:"/year/2016",n:"2016"},{v:"/year/2015",n:"2015"},{v:"/year/2014",n:"2014"},{v:"/year/2013",n:"2013"},{v:"/year/2012",n:"2012"},{v:"/year/2011",n:"2011"},{v:"/year/2010",n:"2010"},{v:"/year/2009",n:"2009"},{v:"/year/2008",n:"2008"},{v:"/year/2007",n:"2007"},{v:"/year/2006",n:"2006"},{v:"/year/2005",n:"2005"},{v:"/year/2004",n:"2004"},{v:"/year/2003",n:"2003"},{v:"/year/2002",n:"2002"},{v:"/year/2001",n:"2001"},{v:"/year/2000",n:"2000"},{v:"/year/1999",n:"1999"},{v:"/year/1998",n:"1998"},{v:"/year/1997",n:"1997"},{v:"/year/1996",n:"1996"},{v:"/year/1995",n:"1995"},{v:"/year/1994",n:"1994"},{v:"/year/1993",n:"1993"},{v:"/year/1992",n:"1992"},{v:"/year/1991",n:"1991"},{v:"/year/1990",n:"1990"},{v:"/year/1989",n:"1989"},{v:"/year/1988",n:"1988"},{v:"/year/1987",n:"1987"},{v:"/year/1986",n:"1986"},{v:"/year/1985",n:"1985"},{v:"/year/1984",n:"1984"},{v:"/year/1983",n:"1983"},{v:"/year/1982",n:"1982"},{v:"/year/1981",n:"1981"},{v:"/year/1980",n:"1980"},{v:"/year/1979",n:"1979"},{v:"/year/1978",n:"1978"},{v:"/year/1977",n:"1977"},{v:"/year/1976",n:"1976"},{v:"/year/1975",n:"1975"},{v:"/year/1974",n:"1974"},{v:"/year/1973",n:"1973"},{v:"/year/1972",n:"1972"},{v:"/year/1971",n:"1971"},{v:"/year/1970",n:"1970"},{v:"/year/1969",n:"1969"},{v:"/year/1968",n:"1968"},{v:"/year/1967",n:"1967"},{v:"/year/1966",n:"1966"},{v:"/year/1965",n:"1965"},{v:"/year/1964",n:"1964"},{v:"/year/1963",n:"1963"},{v:"/year/1962",n:"1962"},{v:"/year/1960",n:"1960"},{v:"/year/1959",n:"1959"},{v:"/year/1954",n:"1954"},{v:"/year/1952",n:"1952"},{v:"/year/1950",n:"1950"},{v:"/year/1949",n:"1949"},{v:"/year/1948",n:"1948"},{v:"/year/1940",n:"1940"},{v:"/year/1939",n:"1939"},{v:"/year/1925",n:"1925"}]}],"domestic-drama":[{key:"class",name:"类型",value:[{n:"全部",v:""},{v:"/movie_bt_tags/pop-popular",n:"POP流行"},{v:"/movie_bt_tags/biography",n:"传记"},{v:"/movie_bt_tags/child",n:"儿童"},{v:"/movie_bt_tags/adventure",n:"冒险"},{v:"/movie_bt_tags/plot",n:"剧情"},{v:"/movie_bt_tags/action",n:"动作"},{v:"/movie_bt_tags/anime",n:"动漫"},{v:"/movie_bt_tags/animation",n:"动画"},{v:"/movie_bt_tags/history",n:"历史"},{v:"/movie_bt_tags/costume",n:"古装"},{v:"/movie_bt_tags/antiquity",n:"古风"},{v:"/movie_bt_tags/homosexual",n:"同性"},{v:"/movie_bt_tags/comedy",n:"喜剧"},{v:"/movie_bt_tags/fantasy",n:"奇幻"},{v:"/movie_bt_tags/family",n:"家庭"},{v:"/movie_bt_tags/terror",n:"恐怖"},{v:"/movie_bt_tags/suspense",n:"悬疑"},{v:"/movie_bt_tags/erotic",n:"情色"},{v:"/movie_bt_tags/thriller",n:"惊悚"},{v:"/movie_bt_tags/drama",n:"戏曲"},{v:"/movie_bt_tags/war",n:"战争"},{v:"/movie_bt_tags/latin",n:"拉丁"},{v:"/movie_bt_tags/funny",n:"搞笑"},{v:"/movie_bt_tags/campus",n:"校园"},{v:"/movie_bt_tags/song-and-dance",n:"歌舞"},{v:"/movie_bt_tags/martial-arts",n:"武侠"},{v:"/movie_bt_tags/disaster",n:"灾难"},{v:"/movie_bt_tags/love",n:"爱情"},{v:"/movie_bt_tags/crime",n:"犯罪"},{v:"/movie_bt_tags/fancy",n:"玄幻"},{v:"/movie_bt_tags/reality-show",n:"真人秀"},{v:"/movie_bt_tags/short-film",n:"短片"},{v:"/movie_bt_tags/kehuan",n:"科幻"},{v:"/movie_bt_tags/documentary",n:"纪录片"},{v:"/movie_bt_tags/talkshow",n:"脱口秀"},{v:"/movie_bt_tags/stageart",n:"舞台艺术"},{v:"/movie_bt_tags/west",n:"西部"},{v:"/movie_bt_tags/sport",n:"运动"},{v:"/movie_bt_tags/youth",n:"青春"},{v:"/movie_bt_tags/music",n:"音乐"},{v:"/movie_bt_tags/ghost",n:"鬼怪"},{v:"/movie_bt_tags/black-film",n:"黑色电影"}]},{key:"year",name:"年份",value:[{n:"全部",v:""},{v:"/year/2024",n:"2024"},{v:"/year/2023",n:"2023"},{v:"/year/2022",n:"2022"},{v:"/year/2021",n:"2021"},{v:"/year/2020",n:"2020"},{v:"/year/2019",n:"2019"},{v:"/year/2018",n:"2018"},{v:"/year/2017",n:"2017"},{v:"/year/2016",n:"2016"},{v:"/year/2015",n:"2015"},{v:"/year/2014",n:"2014"},{v:"/year/2013",n:"2013"},{v:"/year/2012",n:"2012"},{v:"/year/2011",n:"2011"},{v:"/year/2010",n:"2010"},{v:"/year/2009",n:"2009"},{v:"/year/2008",n:"2008"},{v:"/year/2007",n:"2007"},{v:"/year/2006",n:"2006"},{v:"/year/2005",n:"2005"},{v:"/year/2004",n:"2004"},{v:"/year/2003",n:"2003"},{v:"/year/2002",n:"2002"},{v:"/year/2001",n:"2001"},{v:"/year/2000",n:"2000"},{v:"/year/1999",n:"1999"},{v:"/year/1998",n:"1998"},{v:"/year/1997",n:"1997"},{v:"/year/1996",n:"1996"},{v:"/year/1995",n:"1995"},{v:"/year/1994",n:"1994"},{v:"/year/1993",n:"1993"},{v:"/year/1992",n:"1992"},{v:"/year/1991",n:"1991"},{v:"/year/1990",n:"1990"},{v:"/year/1989",n:"1989"},{v:"/year/1988",n:"1988"},{v:"/year/1987",n:"1987"},{v:"/year/1986",n:"1986"},{v:"/year/1985",n:"1985"},{v:"/year/1984",n:"1984"},{v:"/year/1983",n:"1983"},{v:"/year/1982",n:"1982"},{v:"/year/1981",n:"1981"},{v:"/year/1980",n:"1980"},{v:"/year/1979",n:"1979"},{v:"/year/1978",n:"1978"},{v:"/year/1977",n:"1977"},{v:"/year/1976",n:"1976"},{v:"/year/1975",n:"1975"},{v:"/year/1974",n:"1974"},{v:"/year/1973",n:"1973"},{v:"/year/1972",n:"1972"},{v:"/year/1971",n:"1971"},{v:"/year/1970",n:"1970"},{v:"/year/1969",n:"1969"},{v:"/year/1968",n:"1968"},{v:"/year/1967",n:"1967"},{v:"/year/1966",n:"1966"},{v:"/year/1965",n:"1965"},{v:"/year/1964",n:"1964"},{v:"/year/1963",n:"1963"},{v:"/year/1962",n:"1962"},{v:"/year/1960",n:"1960"},{v:"/year/1959",n:"1959"},{v:"/year/1954",n:"1954"},{v:"/year/1952",n:"1952"},{v:"/year/1950",n:"1950"},{v:"/year/1949",n:"1949"},{v:"/year/1948",n:"1948"},{v:"/year/1940",n:"1940"},{v:"/year/1939",n:"1939"},{v:"/year/1925",n:"1925"}]}],"american-drama":[{key:"class",name:"类型",value:[{n:"全部",v:""},{v:"/movie_bt_tags/pop-popular",n:"POP流行"},{v:"/movie_bt_tags/biography",n:"传记"},{v:"/movie_bt_tags/child",n:"儿童"},{v:"/movie_bt_tags/adventure",n:"冒险"},{v:"/movie_bt_tags/plot",n:"剧情"},{v:"/movie_bt_tags/action",n:"动作"},{v:"/movie_bt_tags/anime",n:"动漫"},{v:"/movie_bt_tags/animation",n:"动画"},{v:"/movie_bt_tags/history",n:"历史"},{v:"/movie_bt_tags/costume",n:"古装"},{v:"/movie_bt_tags/antiquity",n:"古风"},{v:"/movie_bt_tags/homosexual",n:"同性"},{v:"/movie_bt_tags/comedy",n:"喜剧"},{v:"/movie_bt_tags/fantasy",n:"奇幻"},{v:"/movie_bt_tags/family",n:"家庭"},{v:"/movie_bt_tags/terror",n:"恐怖"},{v:"/movie_bt_tags/suspense",n:"悬疑"},{v:"/movie_bt_tags/erotic",n:"情色"},{v:"/movie_bt_tags/thriller",n:"惊悚"},{v:"/movie_bt_tags/drama",n:"戏曲"},{v:"/movie_bt_tags/war",n:"战争"},{v:"/movie_bt_tags/latin",n:"拉丁"},{v:"/movie_bt_tags/funny",n:"搞笑"},{v:"/movie_bt_tags/campus",n:"校园"},{v:"/movie_bt_tags/song-and-dance",n:"歌舞"},{v:"/movie_bt_tags/martial-arts",n:"武侠"},{v:"/movie_bt_tags/disaster",n:"灾难"},{v:"/movie_bt_tags/love",n:"爱情"},{v:"/movie_bt_tags/crime",n:"犯罪"},{v:"/movie_bt_tags/fancy",n:"玄幻"},{v:"/movie_bt_tags/reality-show",n:"真人秀"},{v:"/movie_bt_tags/short-film",n:"短片"},{v:"/movie_bt_tags/kehuan",n:"科幻"},{v:"/movie_bt_tags/documentary",n:"纪录片"},{v:"/movie_bt_tags/talkshow",n:"脱口秀"},{v:"/movie_bt_tags/stageart",n:"舞台艺术"},{v:"/movie_bt_tags/west",n:"西部"},{v:"/movie_bt_tags/sport",n:"运动"},{v:"/movie_bt_tags/youth",n:"青春"},{v:"/movie_bt_tags/music",n:"音乐"},{v:"/movie_bt_tags/ghost",n:"鬼怪"},{v:"/movie_bt_tags/black-film",n:"黑色电影"}]},{key:"year",name:"年份",value:[{n:"全部",v:""},{v:"/year/2024",n:"2024"},{v:"/year/2023",n:"2023"},{v:"/year/2022",n:"2022"},{v:"/year/2021",n:"2021"},{v:"/year/2020",n:"2020"},{v:"/year/2019",n:"2019"},{v:"/year/2018",n:"2018"},{v:"/year/2017",n:"2017"},{v:"/year/2016",n:"2016"},{v:"/year/2015",n:"2015"},{v:"/year/2014",n:"2014"},{v:"/year/2013",n:"2013"},{v:"/year/2012",n:"2012"},{v:"/year/2011",n:"2011"},{v:"/year/2010",n:"2010"},{v:"/year/2009",n:"2009"},{v:"/year/2008",n:"2008"},{v:"/year/2007",n:"2007"},{v:"/year/2006",n:"2006"},{v:"/year/2005",n:"2005"},{v:"/year/2004",n:"2004"},{v:"/year/2003",n:"2003"},{v:"/year/2002",n:"2002"},{v:"/year/2001",n:"2001"},{v:"/year/2000",n:"2000"},{v:"/year/1999",n:"1999"},{v:"/year/1998",n:"1998"},{v:"/year/1997",n:"1997"},{v:"/year/1996",n:"1996"},{v:"/year/1995",n:"1995"},{v:"/year/1994",n:"1994"},{v:"/year/1993",n:"1993"},{v:"/year/1992",n:"1992"},{v:"/year/1991",n:"1991"},{v:"/year/1990",n:"1990"},{v:"/year/1989",n:"1989"},{v:"/year/1988",n:"1988"},{v:"/year/1987",n:"1987"},{v:"/year/1986",n:"1986"},{v:"/year/1985",n:"1985"},{v:"/year/1984",n:"1984"},{v:"/year/1983",n:"1983"},{v:"/year/1982",n:"1982"},{v:"/year/1981",n:"1981"},{v:"/year/1980",n:"1980"},{v:"/year/1979",n:"1979"},{v:"/year/1978",n:"1978"},{v:"/year/1977",n:"1977"},{v:"/year/1976",n:"1976"},{v:"/year/1975",n:"1975"},{v:"/year/1974",n:"1974"},{v:"/year/1973",n:"1973"},{v:"/year/1972",n:"1972"},{v:"/year/1971",n:"1971"},{v:"/year/1970",n:"1970"},{v:"/year/1969",n:"1969"},{v:"/year/1968",n:"1968"},{v:"/year/1967",n:"1967"},{v:"/year/1966",n:"1966"},{v:"/year/1965",n:"1965"},{v:"/year/1964",n:"1964"},{v:"/year/1963",n:"1963"},{v:"/year/1962",n:"1962"},{v:"/year/1960",n:"1960"},{v:"/year/1959",n:"1959"},{v:"/year/1954",n:"1954"},{v:"/year/1952",n:"1952"},{v:"/year/1950",n:"1950"},{v:"/year/1949",n:"1949"},{v:"/year/1948",n:"1948"},{v:"/year/1940",n:"1940"},{v:"/year/1939",n:"1939"},{v:"/year/1925",n:"1925"}]}],"korean-drama":[{key:"class",name:"类型",value:[{n:"全部",v:""},{v:"/movie_bt_tags/pop-popular",n:"POP流行"},{v:"/movie_bt_tags/biography",n:"传记"},{v:"/movie_bt_tags/child",n:"儿童"},{v:"/movie_bt_tags/adventure",n:"冒险"},{v:"/movie_bt_tags/plot",n:"剧情"},{v:"/movie_bt_tags/action",n:"动作"},{v:"/movie_bt_tags/anime",n:"动漫"},{v:"/movie_bt_tags/animation",n:"动画"},{v:"/movie_bt_tags/history",n:"历史"},{v:"/movie_bt_tags/costume",n:"古装"},{v:"/movie_bt_tags/antiquity",n:"古风"},{v:"/movie_bt_tags/homosexual",n:"同性"},{v:"/movie_bt_tags/comedy",n:"喜剧"},{v:"/movie_bt_tags/fantasy",n:"奇幻"},{v:"/movie_bt_tags/family",n:"家庭"},{v:"/movie_bt_tags/terror",n:"恐怖"},{v:"/movie_bt_tags/suspense",n:"悬疑"},{v:"/movie_bt_tags/erotic",n:"情色"},{v:"/movie_bt_tags/thriller",n:"惊悚"},{v:"/movie_bt_tags/drama",n:"戏曲"},{v:"/movie_bt_tags/war",n:"战争"},{v:"/movie_bt_tags/latin",n:"拉丁"},{v:"/movie_bt_tags/funny",n:"搞笑"},{v:"/movie_bt_tags/campus",n:"校园"},{v:"/movie_bt_tags/song-and-dance",n:"歌舞"},{v:"/movie_bt_tags/martial-arts",n:"武侠"},{v:"/movie_bt_tags/disaster",n:"灾难"},{v:"/movie_bt_tags/love",n:"爱情"},{v:"/movie_bt_tags/crime",n:"犯罪"},{v:"/movie_bt_tags/fancy",n:"玄幻"},{v:"/movie_bt_tags/reality-show",n:"真人秀"},{v:"/movie_bt_tags/short-film",n:"短片"},{v:"/movie_bt_tags/kehuan",n:"科幻"},{v:"/movie_bt_tags/documentary",n:"纪录片"},{v:"/movie_bt_tags/talkshow",n:"脱口秀"},{v:"/movie_bt_tags/stageart",n:"舞台艺术"},{v:"/movie_bt_tags/west",n:"西部"},{v:"/movie_bt_tags/sport",n:"运动"},{v:"/movie_bt_tags/youth",n:"青春"},{v:"/movie_bt_tags/music",n:"音乐"},{v:"/movie_bt_tags/ghost",n:"鬼怪"},{v:"/movie_bt_tags/black-film",n:"黑色电影"}]},{key:"year",name:"年份",value:[{n:"全部",v:""},{v:"/year/2024",n:"2024"},{v:"/year/2023",n:"2023"},{v:"/year/2022",n:"2022"},{v:"/year/2021",n:"2021"},{v:"/year/2020",n:"2020"},{v:"/year/2019",n:"2019"},{v:"/year/2018",n:"2018"},{v:"/year/2017",n:"2017"},{v:"/year/2016",n:"2016"},{v:"/year/2015",n:"2015"},{v:"/year/2014",n:"2014"},{v:"/year/2013",n:"2013"},{v:"/year/2012",n:"2012"},{v:"/year/2011",n:"2011"},{v:"/year/2010",n:"2010"},{v:"/year/2009",n:"2009"},{v:"/year/2008",n:"2008"},{v:"/year/2007",n:"2007"},{v:"/year/2006",n:"2006"},{v:"/year/2005",n:"2005"},{v:"/year/2004",n:"2004"},{v:"/year/2003",n:"2003"},{v:"/year/2002",n:"2002"},{v:"/year/2001",n:"2001"},{v:"/year/2000",n:"2000"},{v:"/year/1999",n:"1999"},{v:"/year/1998",n:"1998"},{v:"/year/1997",n:"1997"},{v:"/year/1996",n:"1996"},{v:"/year/1995",n:"1995"},{v:"/year/1994",n:"1994"},{v:"/year/1993",n:"1993"},{v:"/year/1992",n:"1992"},{v:"/year/1991",n:"1991"},{v:"/year/1990",n:"1990"},{v:"/year/1989",n:"1989"},{v:"/year/1988",n:"1988"},{v:"/year/1987",n:"1987"},{v:"/year/1986",n:"1986"},{v:"/year/1985",n:"1985"},{v:"/year/1984",n:"1984"},{v:"/year/1983",n:"1983"},{v:"/year/1982",n:"1982"},{v:"/year/1981",n:"1981"},{v:"/year/1980",n:"1980"},{v:"/year/1979",n:"1979"},{v:"/year/1978",n:"1978"},{v:"/year/1977",n:"1977"},{v:"/year/1976",n:"1976"},{v:"/year/1975",n:"1975"},{v:"/year/1974",n:"1974"},{v:"/year/1973",n:"1973"},{v:"/year/1972",n:"1972"},{v:"/year/1971",n:"1971"},{v:"/year/1970",n:"1970"},{v:"/year/1969",n:"1969"},{v:"/year/1968",n:"1968"},{v:"/year/1967",n:"1967"},{v:"/year/1966",n:"1966"},{v:"/year/1965",n:"1965"},{v:"/year/1964",n:"1964"},{v:"/year/1963",n:"1963"},{v:"/year/1962",n:"1962"},{v:"/year/1960",n:"1960"},{v:"/year/1959",n:"1959"},{v:"/year/1954",n:"1954"},{v:"/year/1952",n:"1952"},{v:"/year/1950",n:"1950"},{v:"/year/1949",n:"1949"},{v:"/year/1948",n:"1948"},{v:"/year/1940",n:"1940"},{v:"/year/1939",n:"1939"},{v:"/year/1925",n:"1925"}]}],"anime-drama":[{key:"class",name:"类型",value:[{n:"全部",v:""},{v:"/movie_bt_tags/pop-popular",n:"POP流行"},{v:"/movie_bt_tags/biography",n:"传记"},{v:"/movie_bt_tags/child",n:"儿童"},{v:"/movie_bt_tags/adventure",n:"冒险"},{v:"/movie_bt_tags/plot",n:"剧情"},{v:"/movie_bt_tags/action",n:"动作"},{v:"/movie_bt_tags/anime",n:"动漫"},{v:"/movie_bt_tags/animation",n:"动画"},{v:"/movie_bt_tags/history",n:"历史"},{v:"/movie_bt_tags/costume",n:"古装"},{v:"/movie_bt_tags/antiquity",n:"古风"},{v:"/movie_bt_tags/homosexual",n:"同性"},{v:"/movie_bt_tags/comedy",n:"喜剧"},{v:"/movie_bt_tags/fantasy",n:"奇幻"},{v:"/movie_bt_tags/family",n:"家庭"},{v:"/movie_bt_tags/terror",n:"恐怖"},{v:"/movie_bt_tags/suspense",n:"悬疑"},{v:"/movie_bt_tags/erotic",n:"情色"},{v:"/movie_bt_tags/thriller",n:"惊悚"},{v:"/movie_bt_tags/drama",n:"戏曲"},{v:"/movie_bt_tags/war",n:"战争"},{v:"/movie_bt_tags/latin",n:"拉丁"},{v:"/movie_bt_tags/funny",n:"搞笑"},{v:"/movie_bt_tags/campus",n:"校园"},{v:"/movie_bt_tags/song-and-dance",n:"歌舞"},{v:"/movie_bt_tags/martial-arts",n:"武侠"},{v:"/movie_bt_tags/disaster",n:"灾难"},{v:"/movie_bt_tags/love",n:"爱情"},{v:"/movie_bt_tags/crime",n:"犯罪"},{v:"/movie_bt_tags/fancy",n:"玄幻"},{v:"/movie_bt_tags/reality-show",n:"真人秀"},{v:"/movie_bt_tags/short-film",n:"短片"},{v:"/movie_bt_tags/kehuan",n:"科幻"},{v:"/movie_bt_tags/documentary",n:"纪录片"},{v:"/movie_bt_tags/talkshow",n:"脱口秀"},{v:"/movie_bt_tags/stageart",n:"舞台艺术"},{v:"/movie_bt_tags/west",n:"西部"},{v:"/movie_bt_tags/sport",n:"运动"},{v:"/movie_bt_tags/youth",n:"青春"},{v:"/movie_bt_tags/music",n:"音乐"},{v:"/movie_bt_tags/ghost",n:"鬼怪"},{v:"/movie_bt_tags/black-film",n:"黑色电影"}]},{key:"year",name:"年份",value:[{n:"全部",v:""},{v:"/year/2024",n:"2024"},{v:"/year/2023",n:"2023"},{v:"/year/2022",n:"2022"},{v:"/year/2021",n:"2021"},{v:"/year/2020",n:"2020"},{v:"/year/2019",n:"2019"},{v:"/year/2018",n:"2018"},{v:"/year/2017",n:"2017"},{v:"/year/2016",n:"2016"},{v:"/year/2015",n:"2015"},{v:"/year/2014",n:"2014"},{v:"/year/2013",n:"2013"},{v:"/year/2012",n:"2012"},{v:"/year/2011",n:"2011"},{v:"/year/2010",n:"2010"},{v:"/year/2009",n:"2009"},{v:"/year/2008",n:"2008"},{v:"/year/2007",n:"2007"},{v:"/year/2006",n:"2006"},{v:"/year/2005",n:"2005"},{v:"/year/2004",n:"2004"},{v:"/year/2003",n:"2003"},{v:"/year/2002",n:"2002"},{v:"/year/2001",n:"2001"},{v:"/year/2000",n:"2000"},{v:"/year/1999",n:"1999"},{v:"/year/1998",n:"1998"},{v:"/year/1997",n:"1997"},{v:"/year/1996",n:"1996"},{v:"/year/1995",n:"1995"},{v:"/year/1994",n:"1994"},{v:"/year/1993",n:"1993"},{v:"/year/1992",n:"1992"},{v:"/year/1991",n:"1991"},{v:"/year/1990",n:"1990"},{v:"/year/1989",n:"1989"},{v:"/year/1988",n:"1988"},{v:"/year/1987",n:"1987"},{v:"/year/1986",n:"1986"},{v:"/year/1985",n:"1985"},{v:"/year/1984",n:"1984"},{v:"/year/1983",n:"1983"},{v:"/year/1982",n:"1982"},{v:"/year/1981",n:"1981"},{v:"/year/1980",n:"1980"},{v:"/year/1979",n:"1979"},{v:"/year/1978",n:"1978"},{v:"/year/1977",n:"1977"},{v:"/year/1976",n:"1976"},{v:"/year/1975",n:"1975"},{v:"/year/1974",n:"1974"},{v:"/year/1973",n:"1973"},{v:"/year/1972",n:"1972"},{v:"/year/1971",n:"1971"},{v:"/year/1970",n:"1970"},{v:"/year/1969",n:"1969"},{v:"/year/1968",n:"1968"},{v:"/year/1967",n:"1967"},{v:"/year/1966",n:"1966"},{v:"/year/1965",n:"1965"},{v:"/year/1964",n:"1964"},{v:"/year/1963",n:"1963"},{v:"/year/1962",n:"1962"},{v:"/year/1960",n:"1960"},{v:"/year/1959",n:"1959"},{v:"/year/1954",n:"1954"},{v:"/year/1952",n:"1952"},{v:"/year/1950",n:"1950"},{v:"/year/1949",n:"1949"},{v:"/year/1948",n:"1948"},{v:"/year/1940",n:"1940"},{v:"/year/1939",n:"1939"},{v:"/year/1925",n:"1925"}]}]}})
}

async function category(inReq, _outResp) {
    // tid, pg, filter, extend
    let id = inReq.body.id;
    let pg = inReq.body.page;
    let extend = inReq.body.filters;

	if(pg <= 0) pg = 1;
    
    var tid = await request(url + "/" + id + (extend.area || "") + (extend.year || "") + (extend.class || "") + (extend.catedd || "") + "/page/" + pg),
    $ = load(tid);
       let ext = $("div.mrb > ul > li");
       let videos = _.map(ext, item => {
            var img = $(item).find("img:first")[0],
                a = $(item).find("a:first")[0],
                hdinfo = $($(item).find("div.hdinfo")[0]).text().trim(),
                item = $($(item).find("div.jidi")[0]).text().trim();
            return {
                vod_id: a.attribs.href.replace(/.*?\/movie\/(.*).html/g, "$1"),
                vod_name: img.attribs.alt,
                vod_pic: img.attribs["data-original"],
                vod_remarks: item || hdinfo || ""
            }
        });
        let exttotal = 0 < $("div.mrb > div.pagenavi_txt > a:contains(>)").length ? parseInt(pg) + 1 : parseInt(pg);
    return JSON.stringify({
        page: parseInt(pg),
        pagecount: exttotal,
        limit: 20,
        total: 20 * exttotal,
        list: videos
    })
}

function stripHtmlTag(src) {
    return src.replace(/<\/?[^>]+(>|$)/g, "").replace(/&.{1,5};/g, "").replace(/\s{2,}/g, " ")
}

async function detail(inReq, _outResp) {
    const ids = !Array.isArray(inReq.body.id) ? [inReq.body.id] : inReq.body.id;
    const videos = [];

    for (const id of ids) {
        var html = await request(url + "/movie/" + id + ".html"),
        $ = load(html),
        html = $("ul.moviedteail_list > li"),
        vod = {
            vod_id: id,
            vod_pic: $("div.dyimg img:first").attr("src"),
            vod_remarks: "",
            vod_content: stripHtmlTag($("div.yp_context").html()).trim()
        };
        for (const info of html) {
            var i = $(info).text().trim();
            i.startsWith("地区：") ? vod.vod_area = i.substring(3) : i.startsWith("年份：") ? vod.vod_year = i.substring(3) : i.startsWith("导演：") ? vod.vod_director = _.map($(info).find("a"), a => a.children[0].data).join("/") : i.startsWith("主演：") ? vod.vod_actor = _.map($(info).find("a"), a => a.children[0].data).join("/") : i.startsWith("语言：") && (vod.vod_lang = i.substring(3))
        }

        // 两个方法用途一致,换成后面的处理方法.
        // var id = _.map($("div.paly_list_btn > a"),
        // a => a.children[0].data + "$" + a.attribs.href.replace(/.*?\/v_play\/(.*).html/g, "$1"));
        
        const playlist = _.map($('div.paly_list_btn > a'), (a) => {
            return a.children[0].data + '$' + a.attribs.href.replace(/.*?\/v_play\/(.*).html/g, '$1');
        });

        vod.vod_play_from = key, 
        vod.vod_play_url = playlist.join("#");
        videos.push(vod);
    }
    
     return JSON.stringify({
        list: videos
    })
}

async function play(inReq, _outResp) {
    // flag, id, flags
    const id = inReq.body.id;

    const link = url + "/v_play/" + id + ".html",
        html = await request(link),
        $ = load(html),
        iframe = $("body iframe[src*=Cloud]");
    if (0 < iframe.length) {
        const iframeHtml = (await req(iframe[0].attribs.src, {
            headers: {
                Referer: link,
                "User-Agent": UA
            }
        })).content;
        let code = iframeHtml.match(/var url = '(.*?)'/)[1].split("").reverse().join(""),
            temp = "";
        for (let i = 0; i < code.length; i += 2) temp += String.fromCharCode(parseInt(code[i] + code[i + 1], 16));
        const playUrl = temp.substring(0, (temp.length - 7) / 2) + temp.substring((temp.length - 7) / 2 + 7);
        return JSON.stringify({
            parse: 0,
            url: playUrl
        })
    } else {
        let playUrl = 'error';
        try {
            const js = $("script:contains(window.wp_nonce)").html();
            const group = js.match(/(var.*)eval\((\w*\(\w*\))\)/);
            const md5 = Crypto;
            const result = eval(group[1] + group[2]);
                playUrl = result.match(/url:.*?['"](.*?)['"]/)[1];
        } catch (error) {
            
        }
        
        return JSON.stringify({
            parse: 0,
            url: playUrl
        })
    }
}

async function search(inReq, _outResp) {

    let pg = inReq.body.page;
    const wd = inReq.body.wd;
    let page = pg || 1;
    if (page == 0) page = 1;

    const html = await request(url + "/page/1?s=" + wd);
    const $ = load(html);
    const items = $("div.search_list > ul > li");
    
    let videos = _.map(items, item => {
        var img = $(item).find("img:first")[0],
            a = $(item).find("a:first")[0],
            hdinfo = $($(item).find("div.hdinfo")[0]).text().trim(),
            item = $($(item).find("div.jidi")[0]).text().trim();
        return {
            vod_id: a.attribs.href.replace(/.*?\/movie\/(.*).html/g, "$1"),
            vod_name: img.attribs.alt,
            vod_pic: img.attribs["data-original"],
            vod_remarks: item || hdinfo || ""
        }
    });

    return {
        list: videos,
    };
}

async function test(inReq, outResp) {
    try {
        const printErr = function (json) {
            if (json.statusCode && json.statusCode == 500) {
                console.error(json);
            }
        };
        const prefix = inReq.server.prefix;
        const dataResult = {};
        let resp = await inReq.server.inject().post(`${prefix}/init`);
        dataResult.init = resp.json();
        printErr(resp.json());
        resp = await inReq.server.inject().post(`${prefix}/home`);
        dataResult.home = resp.json();
        printErr("" + resp.json());
        if (dataResult.home.class.length > 0) {
            resp = await inReq.server.inject().post(`${prefix}/category`).payload({
                id: dataResult.home.class[0].type_id,
                page: 1,
                filter: true,
                filters: {},
            });
            dataResult.category = resp.json();
            printErr(resp.json());
            if (dataResult.category.list.length > 0) {
                resp = await inReq.server.inject().post(`${prefix}/detail`).payload({
                    id: dataResult.category.list[0].vod_id, // dataResult.category.list.map((v) => v.vod_id),
                });
                dataResult.detail = resp.json();
                printErr(resp.json());
                if (dataResult.detail.list && dataResult.detail.list.length > 0) {
                    dataResult.play = [];
                    for (const vod of dataResult.detail.list) {
                        const flags = vod.vod_play_from.split('$$$');
                        const ids = vod.vod_play_url.split('$$$');
                        for (let j = 0; j < flags.length; j++) {
                            const flag = flags[j];
                            const urls = ids[j].split('#');
                            for (let i = 0; i < urls.length && i < 2; i++) {
                                resp = await inReq.server
                                    .inject()
                                    .post(`${prefix}/play`)
                                    .payload({
                                        flag: flag,
                                        id: urls[i].split('$')[1],
                                    });
                                dataResult.play.push(resp.json());
                            }
                        }
                    }
                }
            }
        }
        resp = await inReq.server.inject().post(`${prefix}/search`).payload({
            wd: '暴走',
            page: 1,
        });
        dataResult.search = resp.json();
        printErr(resp.json());
        return dataResult;
    } catch (err) {
        console.error(err);
        outResp.code(500);
        return { err: err.message, tip: 'check debug console output' };
    }
}

export default {
    meta: {
        key: 'subaibai',
        name: '素白',
        type: 3,
    },
    api: async (fastify) => {
        fastify.post('/init', init);
        fastify.post('/home', home);
        fastify.post('/category', category);
        fastify.post('/detail', detail);
        fastify.post('/play', play);
        fastify.post('/search', search);
        fastify.get('/test', test);
    },
};
