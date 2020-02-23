/**
* @description 多个数组对应位置相加得出新的数组
* @param {Array} rest 任意多个数组
* @return {Array} 对应数组位置求和新的数组
*/
function sumAarrays(...rest){
    const arrays = rest;
    if(arrays.length <= 1){
        return arrays;
    }
    let sum = [];
   for (let i = 0; i < arrays.length; i++) {
       const element = arrays[i];
       if(i===0){
        sum=element;
       }else{
           sum= sumArray(sum,element)
       }
   }
   return sum;
}
function sumArray(arr1,arr2){
    return arr1.map((val,index)=>val+arr2[index])

}
/**
* @description 获取对应年月之前n个月的月份数组
* @param {Number,String} c_year 年份
* @param {Number,String} c_month 月份
* @param {Number} n 数组月份数量
* @param {String} split 分隔符
* @param {Boolean} short_year 年份是否两位简写
* @return {Array} 年月的数组
*/
function getMonthsArr(c_year,c_month,n,c_split,short_year){
    const dataArr = [];
    const x = n || 12;
    const split = c_split || '';
  　　const data = new Date(c_year,c_month-1);
  　　const year = data.getFullYear();
  　　data.setMonth(data.getMonth()+1, 1)//获取到当前月份,设置月份
  　　for (let i = 0; i < x; i++) {
      　　　　data.setMonth(data.getMonth() - 1);//每次循环一次 月份值减1
      　　　　let m = data.getMonth() + 1;
      　　　　m = m < 10 ? split+"0" + m : split+m;
            const y = short_year ? (data.getFullYear()+"").slice(-2) : data.getFullYear();
      　　　　dataArr.unshift(y + "" + (m))
      }
      return dataArr;
  }
  //获取多月参数
function getDatesParams(dates, cityCodeArr, encodeArray) {
    let paramStr = '';
    for (let k = 0; k < dates.length; k++) {
        const date = dates[k];
        for (let index = 0, len = cityCodeArr.length; index < len; index++) {
            const element = cityCodeArr[index];
            for (let i = 0, len2 = encodeArray.length; i < len2; i++) {
                const ele = encodeArray[i];
                paramStr += ('['+date+','+element+','+ele+'],');
            }
        }
    }
    paramStr = paramStr.substring(0, paramStr.length - 1);
    return paramStr;
}
//查找对应月份和指标和的值，可限制小数位数
function searchValOfDate(date,encode, dataArr, fix) {
    var fix = fix !==undefined ? fix : 2;
    var target = {};
    for (var index = 0, len = dataArr.length; index < len; index++) {
        var element = dataArr[index];
        if (element.indexCode === encode && element.bilMonth === date) {
            target = element;
        }
    }
    return parseFloat(target.indexVlue).toFixed(fix) 
}
// 根据 编码数组出每个编码对应的所有值
function searchEncodesValArr(encodes, dataArr, fix){
    var fix = fix || 2;
    var target = [];
    for (var i = 0; i < encodes.length; i++) {
        var encode = encodes[i];
        for (var index = 0, len = dataArr.length; index < len; index++) {
            var element = dataArr[index];
            if (element.indexCode === encode) {
                target.push({value:Number(parseFloat(element.indexVlue).toFixed(fix)),encode:encode});
            }
        }
    }
    return target;
}
// 根据 编码数组出每个编码对应的固定月份所有值
function searchEncodesMonthValArr(encodes,month,dataArr, fix){
    var fix = fix || 2;
    var target = [];
    for (var i = 0; i < encodes.length; i++) {
        var encode = encodes[i];
        for (var index = 0, len = dataArr.length; index < len; index++) {
            var element = dataArr[index];
            if (element.indexCode === encode && element.bilMonth === month) {
                target.push({value:parseFloat(element.indexVlue).toFixed(fix),encode:encode});
            }
        }
    }
    return target;
}

// 根据-指标数组-和-编码数组-查出所有指标对应月份的所有编码值
function searchMonthCodesValArr(encodes, codes, month, dataArr) {
    var target = [];
    for (var index = 0; index < encodes.length; index++) {
        var encode = encodes[index];
        var arr = [];
        for (var i = 0; i < codes.length; i++) {
            var ele = codes[i];
            for (var j = 0, len = dataArr.length; j < len; j++) {
                var element = dataArr[j];
                if (element.indexCode === encode && element.accountCode === ele && element.bilMonth === month) {
                    arr.push(parseFloat(element.indexVlue).toFixed(2) ? parseFloat(element.indexVlue).toFixed(2) : 0);
                }
            }
        }

        target.push({ encode: encodes[index], dataArr: arr });
    }
    return target;
}
// 根据-指标数组-和-月份数组-查出所有指标对应地市的所有编码值
function searchCodeMonthsValArr(encodes, code, months, dataArr,fix) {
    var fix = fix !== undefined ? fix : 2;
    var target = [];
    for (var index = 0; index < encodes.length; index++) {
        var encode = encodes[index];
        var arr = [];
        for (var i = 0; i < months.length; i++) {
            var ele = months[i];
            for (var j = 0, len = dataArr.length; j < len; j++) {
                var element = dataArr[j];
                if (element.indexCode === encode && element.accountCode === code && element.bilMonth === ele) {
                    arr.push(parseFloat(element.indexVlue).toFixed(fix) ? parseFloat(element.indexVlue).toFixed(fix) : 0);
                }
            }
        }

        target.push({ encode: encodes[index], dataArr: arr });
    }
    return target;
}
//得到连续的指标数组
function getContinusEncodes(start,end,temp){
	const target = [];
	for (let i = start; i < end+1; i++) {
		target.push(temp+(i>9?i:'0'+i))
	}
	return target;
}
function getBeforeMothStr(str){
    var len = str.length;
    var year = str.substring(0,len-2);
    var month = str.substring(len-2,len);
    year = month === '01' ? ~~year - 1 : year;
    if(~~month - 1 === 0){
        month = 12;
    }    
    else if(~~month - 1 < 10){
        month = '0'+(~~month - 1);
    }else{
        month = ~~month - 1;
    }
    return year+''+month;
}
export {
    sumAarrays,
    getMonthsArr,
    getDatesParams,
    searchValOfDate,
    searchMonthCodesValArr,
    searchCodeMonthsValArr,
    searchEncodesValArr,
    getBeforeMothStr,
    searchEncodesMonthValArr,
    getContinusEncodes
}
