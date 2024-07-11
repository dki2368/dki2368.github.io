// ------ 計算機 ------

var package_weight; // 包裹重量
var package_l, package_w, package_h; // 包裹長/寬/高
var package_v, tempP_V; //包裹體積
var chargeable_weight, CW, Pshipping_fee; // 計費重量/運費
var SPfee; // 加強包裝後費用

// 空運航線
const air_freight = [
    {
        w_NO: 1,
        w_Name: "Newatever 基本方案",
        volume: true,
        volumetric_weight: VW(),
        shipping_fee: function SF() {
            tempP_V = VW();
            WorV();
            if (chargeable_weight <= 6) {
                Pshipping_fee = 1000 * chargeable_weight;
            } else {
                Pshipping_fee = 800 * 6 + 800 * (WorV_2() - 6);
            }
            if (chargeable_weight < 10) Pshipping_fee += 300;
            Pshipping_fee = Math.floor(Pshipping_fee * 0.2197) + 1;
            return Pshipping_fee;
        },
        shipping_rate: "運費說明1",
        strength_packaging: true,
        SP_fee: function SP() {
            SPfee = Pshipping_fee + WorV_2() * 300;
            return SPfee;
        },
        SP_rate: "加強包裝收費說明1",
        free_consolidation: true,
        free_storage: 21,
        demurrage: 150,
        transit_time: 4,
        days: "約4~6天",
        COD: true,
        tax_free: true,
        ordinary_mail: true
    },
    {
        w_NO: 2,
        w_Name: "運匠",
        volume: true,
        volumetric_weight: VW(),
        shipping_fee: function SF() {
            tempP_V = VW();
            WorV();
            Pshipping_fee = 200 * chargeable_weight;
            return Pshipping_fee;
        },
        shipping_rate: "運費說明2",
        strength_packaging: false,
        SP_fee: "",
        SP_rate: "",
        free_consolidation: false,
        free_storage: 365,
        demurrage: 0,
        transit_time: 5,
        days: "約5~7天",
        COD: true,
        tax_free: true,
        ordinary_mail: false
    },
    {
        w_NO: 3,
        w_Name: "奶油貓 買手專線",
        volume: true,
        volumetric_weight: VW() / 2,
        shipping_fee: function SF() {
            tempP_V = VW() / 2;
            WorV();
            if (chargeable_weight <= 3) {
                Pshipping_fee = 180 * 3 + 80;
            } else if (chargeable_weight > 3 && chargeable_weight < 6) {
                Pshipping_fee = 180 * chargeable_weight + 80;
            } else {
                Pshipping_fee = 180 * chargeable_weight
            }
            return Pshipping_fee;
        },
        shipping_rate: "運費說明3",
        strength_packaging: false,
        SP_fee: "",
        SP_rate: "",
        free_consolidation: true,
        free_storage: 30,
        demurrage: 30,
        transit_time: 7,
        days: "約7~14天",
        COD: false,
        tax_free: true,
        ordinary_mail: false
    },
    {
        w_NO: 4,
        w_Name: "無國界",
        volume: true,
        volumetric_weight: VW() * 0.75,
        shipping_fee: function SF() {
            tempP_V = VW() * 0.75;
            WorV();
            if (chargeable_weight <= 3) {
                Pshipping_fee = 230 * chargeable_weight;
            } else {
                Pshipping_fee = 230 * 3 + 230 * (WorV_2() - 3);
            }
            return Pshipping_fee;
        },
        shipping_rate: "運費說明4",
        strength_packaging: true,
        SP_fee: function SP() {
            SPfee = Pshipping_fee + 40;
            return SPfee;
        },
        SP_rate: "加強包裝收費說明4",
        free_consolidation: true,
        free_storage: 30,
        demurrage: 20,
        transit_time: 5,
        days: "約5~7天",
        COD: true,
        tax_free: true,
        ordinary_mail: true
    },
    {
        w_NO: 5,
        w_Name: "Newatever 免打包出貨",
        volume: true,
        volumetric_weight: VW(),
        shipping_fee: function SF() {
            tempP_V = VW();
            WorV();
            Pshipping_fee = 800 * WorV_2();
            if (chargeable_weight < 10) Pshipping_fee += 300;
            Pshipping_fee = Math.floor(Pshipping_fee * 0.2197) + 1;
            return Pshipping_fee;
        },
        shipping_rate: "運費說明5",
        strength_packaging: false,
        SP_fee: "",
        SP_rate: "",
        free_consolidation: false,
        free_storage: 21,
        demurrage: 150,
        transit_time: 4,
        days: "約4~6天",
        COD: true,
        tax_free: true,
        ordinary_mail: true
    },
    {
        w_NO: 6,
        w_Name: "奶油貓 基本方案",
        volume: true,
        volumetric_weight: VW(),
        shipping_fee: function SF() {
            tempP_V = VW();
            WorV();
            Pshipping_fee = 230 * WorV_2();
            if (chargeable_weight < 6) Pshipping_fee += 80;
            return Pshipping_fee;
        },
        shipping_rate: "運費說明6",
        strength_packaging: false,
        SP_fee: "",
        SP_rate: "",
        free_consolidation: false,
        free_storage: 21,
        demurrage: 150,
        transit_time: 5,
        days: "約4~6天",
        COD: true,
        tax_free: true,
        ordinary_mail: true
    },
]

function VW() { // 常見材積公式
    package_v = package_l * package_w * package_h / 6000;
    return package_v;
}

function WorV() { // 每1kg計價，取實重和材積中較大者
    if (package_weight >= tempP_V) {
        if (package_weight % Math.floor(package_weight) != 0) {
            chargeable_weight = Math.floor(package_weight) + 1;
        } else {
            chargeable_weight = package_weight;
        }
        CW = package_weight;

    } else {
        if (tempP_V % Math.floor(tempP_V) != 0) {
            chargeable_weight = Math.floor(tempP_V) + 1;
        } else {
            chargeable_weight = tempP_V;
        }
        CW = tempP_V;
    }
    return chargeable_weight;
}

function WorV_2() { // 每0.5kg計價
    if ((chargeable_weight - CW) >= 0.5) {
        chargeable_weight -= 0.5;
    }
    return chargeable_weight;
}


// 按鈕監聽
let btn_wFS = document.getElementById("btn_wFilterSort");
btn_wFS.addEventListener("click", w_FS, false);


// 按按鈕後執行計算機函式
function w_FS() {
    // 取得預估重量&包裹長寬高
    package_weight = document.getElementById("i_Weight").value;
    package_l = document.getElementById("i_PL").value;
    package_w = document.getElementById("i_PW").value;
    package_h = document.getElementById("i_PH").value;

    // 取得篩選選項
    var temp_forF = air_freight;
    var temp_Fend = [temp_forF, temp_forF, temp_forF, temp_forF, temp_forF];
    var getFbox = document.getElementsByName("w_Filter");

    if (getFbox[0].checked) temp_Fend[0] = temp_Fend[0].filter(element => element["tax_free"] == true);
    if (getFbox[1].checked) temp_Fend[1] = temp_Fend[1].filter(element => element["free_consolidation"] == true);
    if (getFbox[2].checked) temp_Fend[2] = temp_Fend[2].filter(element => element["strength_packaging"] == true);
    // if (getFbox[3].checked) temp_Fend[3] = temp_Fend[3].filter(element => element["volume"] == false);
    if (getFbox[3].checked) temp_Fend[3] = temp_Fend[3].filter(element => element["ordinary_mail"] == true);
    if (getFbox[4].checked) temp_Fend[4] = temp_Fend[4].filter(element => element["COD"] == true);

    var F_end = [];
    F_end = temp_Fend[0].filter((e) => { return temp_Fend[1].indexOf(e) > -1 });
    for (i = 1; i < temp_Fend.length; i++) {
        F_end = F_end.filter((e) => { return temp_Fend[i].indexOf(e) > -1 })
    }

    // 排序
    var getSvalue = document.getElementById("w_Sort").value;

    var S_end = F_end.sort(function (a, b) { //價格低到高
        return a.shipping_fee() - b.shipping_fee();
    })

    if (getSvalue == 2 || getSvalue == 5) { // 免費倉儲天數多到少
        S_end = S_end.sort(function (a, b) {
            return b["free_storage"] - a["free_storage"];
        })
    } else if (getSvalue == 3 || getSvalue == 6) { // 運輸天數短到長
        S_end = S_end.sort(function (a, b) {
            return a["transit_time"] - b["transit_time"];
        })
    }

    // 印出
    if (getSvalue <= 3) {
        // 印出最符合條件的
        var FS_text = `<div class="FSreturn"><p>推薦使用：</p>`;

        if (F_end.length == 0) {
            FS_text += "<p>沒有符合的集運</p>";
        } else {
            FS_text += `<ul>
            <li>
            集運： <br class="formobile">${S_end[0]["w_Name"]} <br>
            <ul class="data">
                <li>費用： 約 ${S_end[0].shipping_fee()} 元</li>`;
            if (getFbox[2].checked) {
                FS_text += `<li>加強包裝後費用： 約 ${S_end[0].SP_fee()} 元</li>`;
            }
            FS_text +=
                `<li>免費倉儲天數： ${S_end[0]["free_storage"]}</li>
                <li>寄送天數： ${S_end[0]["days"]}</li>
            </ul> </li> <br>`
        }
        FS_text += `</ul></div>`;
        document.getElementById("searchFS").innerHTML = FS_text;

    } else {
        // 印出所有符合條件的
        var FS_text = `<div class="FSreturn FSscroll"><p>符合條件的集運：</p>`;

        if (F_end.length == 0) {
            FS_text += "<p>沒有符合的集運</p>";
        } else {
            FS_text += "<ul>";
            for (var i = 0; i < S_end.length; i++) {
                FS_text +=
                    `<li>
                集運： ${S_end[i]["w_Name"]} <br>
                <ul class = "data">
                <li>費用： 約 ${S_end[i].shipping_fee()} 元 <br> ${S_end[i]["shipping_rate"]}</li>`;
                if (getFbox[2].checked) {
                    FS_text += `<li>加強包裝後費用： 約 ${S_end[i].SP_fee()} 元 <br> ${S_end[i]["SP_rate"]}</li>`;
                }
                FS_text +=
                    `<li>免費倉儲天數： ${S_end[i]["free_storage"]}</li>
                <li>申請打包後配達天數： ${S_end[i]["days"]}</li>
                </ul> </li> <br>`
            }
            FS_text += `</ul></div>`;
        }
        document.getElementById("searchFS").innerHTML = FS_text;
    }
}