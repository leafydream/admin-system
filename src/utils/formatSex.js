const SEX = {
  1: '男',
  2: '女',
};

let format_SEX = num => {
  let sex;
  if(num === 1){
    sex = SEX['1'];
  }else if(num === 2){
    sex = SEX['2'];
  }else{
    sex = '未填写';
  }
  return sex;
};

export default format_SEX;
