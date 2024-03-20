// import Vue from 'vue'

// TinyMce setup
function tinyMce(){
  let data = {
    token: '0owqnt3cqdly029w7huz6jb33gtd2kr4mmrhjl2uh9pa5frc',
    init: {
      plugins: [
      'advlist lists link image paste help wordcount'
      ],
      toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help'
    }
  };

  return data;
}

// Vue.prototype.$enToBnNumber = (str) => {
function enToBnNumber(str) {
  let reqStr = str + "";
  const bnArr = ['০','১','২','৩','৪','৫','৬','৭','৮','৯']
  let getStr = ''
  for(var i=0; i < reqStr.length; i++) {
      if(bnArr[reqStr[i]]!==undefined) getStr = getStr + bnArr[reqStr[i]];
      else getStr = getStr + reqStr[i];
  }
  return getStr
};

function enToBnDateTime(str) {
  let dateTimeObj = {
    'January': 'জানুয়ারি',
    'February': 'ফেব্রুয়ারি',
    'March': 'মার্চ',
    'April': 'এপ্রিল',
    'May': 'মে',
    'June': 'জুন',
    'July': 'জুলাই',
    'August': 'আগস্ট',
    'September': 'সেপ্টেম্বর',
    'October': 'অক্টোবর',
    'November': 'নভেম্বর',
    'December': 'ডিসেম্বর',
    'AM': 'সকাল',
    'PM': 'রাত'
  }
  let getStrArr = str.split(' ');
  let getStr = str
  // return getStrArr.length;
  for(var i=0; i < getStrArr.length; i++) {    
    for(var month in dateTimeObj) {
      if(getStrArr[i].search(month) >= 0) getStr = getStr.replace(month, dateTimeObj[month]);
    }
  }
  return this.$enToBnNumber(getStr)
}

function strCapitalize(s) {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validateContactNumber(number){
  const re = /^[\+]?[0-9]{1,3}?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,9}$/g;
  return re.test(number);
}

// slug setup
function strSlug(s) {
  if (typeof s !== 'string') return ''
  return s.trim().toLowerCase().replace(/\s/g,'-')
}

// sub string setup
function subString(s, words=10) {
  let rplItem = ' '
  let getWords = s.replace( /(<([^>]+)>)/ig, '').split(rplItem)
  let getStr = ''
  console.log(getWords)
  // getWords.forEach((v,i) => {
  //   getStr = getStr + rplItem + v
  //   if(i>words) return false
  // })

  for(let i=0; getWords[i]!=undefined; i++){
    getStr = getStr + rplItem + getWords[i]
    if(i>words) {
      getStr = getStr + '...'
      break;
    }
  }

  return getStr
}

// Vue.prototype.$timeAgo = (time) => {
function timeAgo(str) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour') 
  } else { 
    return pluralize(~~(between / 86400), ' day') 
  } 
}

function imageUrl(file_path){
  return 'https://api.eduhub.gov.bd/public/storage/images/' + file_path
}

export default ({ app }, inject) => {
  // console.log('APP', app)
  inject('tinyMce', tinyMce);
  inject('validateEmail', validateEmail);
  inject('validateContactNumber', validateContactNumber);
  inject('enToBnNumber', enToBnNumber);
  inject('enToBnDateTime', enToBnDateTime);
  inject('strCapitalize', strCapitalize);
  inject('strSlug', strSlug);
  inject('subString', subString);
  inject('timeAgo', timeAgo);
  inject('imageUrl', imageUrl);
}