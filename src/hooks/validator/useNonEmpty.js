import { isEmpty } from "@/hooks/datatreating/useIsEmpty.js";

   
   export default (rule, value, callback) => {
      if (!value) {	//如果输入为空直接返回
        callback(new Error());
      } else {
        //如果字符串 string 中含有与 RegExpObject 匹配的文本，则返回 true，否则返回 false。
        if (!isEmpty(value)) {	//匹配成功返回
          callback();	
        } else {	//匹配不成功返回错误显示
          callback(new Error());
        }
      }
    };

    