/**
 * Created by kitchiong on 1/11/15.
 */



if(Meteor.isClient){
    Template.lanuch.helpers({


        tasks: function(){
            return Tasks.find({createdBy: Meteor.userId()});

        },


        addEffectEvent: function () {

                var listItems = document.getElementById('lists').lastElementChild;

                    listItems.firstElementChild.firstElementChild.style.borderRight = "solid 10px " + colorChange();
                if (listItems != null) {
                    listItems.addEventListener('click', function () {
                        if (this.firstElementChild.firstElementChild.firstElementChild.className.indexOf("clicked") == -1) {
                            this.firstElementChild.firstElementChild.style.borderRight = "solid 80px " + colorChange();

                            this.firstElementChild.firstElementChild.firstElementChild.className = "fa fa-minus fa-2x clicked";

                        }
                        else {
                            this.firstElementChild.firstElementChild.style.borderRight = "solid 10px " + colorChange();
                            this.firstElementChild.firstElementChild.firstElementChild.className = "fa fa-minus fa-2x noClicked";
                        }
                    });
                }

                },

            addRemoveEvent: function(){
                var minusList = document.getElementById('lists').lastElementChild.firstElementChild.firstElementChild.firstElementChild;
                minusList.addEventListener('click', function () {
                    var temp = this.parentNode.innerText;
                    //console.log(Tasks.find({content: temp}).fetch());
                    Meteor.call('removeOne', temp);
                    //Tasks.remove(this);

                });


            }
    });

    function colorChange(){
        var r = Math.floor((Math.random() * 300) + 1);
        var g = Math.floor((Math.random() * 200) + 1);
        var b = Math.floor((Math.random() * 200) + 1);
        return "rgb(" + r + "," + g + "," + b + ")";
    }


    Template.lanuch.events({
       "click #addOption": function(){
           var newTask = prompt("Enter the task", "");
           if (newTask == null || newTask.length == 0){
               newTask = "Empty Item";
           }

          // && Tasks.find({content:newTask}).fetch()[1].createdBy == Meteor.userId
           if (Tasks.find({content: newTask, createdBy: Meteor.userId()}).fetch().length == 1){
               alert("Duplicate task");
           }else{
               Tasks.insert({content: newTask, createdBy: Meteor.userId()});
           }
       }

    });

    document.addEventListener('DOMContentLoaded', function(){
        var clear = document.getElementById('clearItems');
        clear.addEventListener('click', function(){
            Meteor.call('removeAll');
        });
    });


}
/*
 var rowDiv = document.createElement('div');
 rowDiv.className = "row";
 var innerDiv = document.createElement('div');
 innerDiv.className = "col-sm-12";
 var liTag = document.createElement('li');
 var iTag = document.createElement('i');
 iTag.className = "fa fa-minus fa-2x noClicked";
 */

/*
 liTag.innerText = newTask;
 liTag.appendChild(iTag);
 innerDiv.appendChild(liTag);
 rowDiv.appendChild(innerDiv);
 */