/**
 * Created by kitchiong on 4/30/15.
 */
if(Meteor.isServer){
    Meteor.methods({
        removeOne: function(item){

            return Tasks.remove({content: item, createdBy: Meteor.userId()});
        },

        removeAll: function(){
            return Tasks.remove({createdBy: Meteor.userId()});
        }
    })
}