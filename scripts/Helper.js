export default Helper = {
   createResponse : function createResponse (status, message) {
        return {
            "status":status,
            "message":message
        }; 
    },

   findItem : function findItem (key, array) {
        var index = null;

        for (var i=0; i < array.length; i++) {
            if (array[i].itemId == key) {
                index = i;
                break;
            }
        }
        return index;
    }
};
