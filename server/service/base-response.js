/**
** Title: base.response.js
** Author: Wendy Leon
** Date: March 18 2021
** Description: Response Object
**/


 class BaseResponse {

  /***
   * @param {*} httpCode String http status code
   * @param {*} message message you want user to see
   * @param {*} date object || null
  **/

   constructor (httpCode, message, data) {
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
    this.timestamp = new Date().toLocaleDateString('en-US');
  }

  /**
  *  toObject function for returning an object
  *  @returns new object literal with all of the BaseResponse fields
  **/
   toObject()
   {
     return {
       "httpCode": this.httpCode,
       "message": this.message,
       "data": this.data,
       "timestamp": this.timestamp
     }
   }
}

module.exports = BaseResponse;
