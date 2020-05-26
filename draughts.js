

var grid = [
0, 1, 0, 1, 0, 1, 0, 1,
1, 0, 1, 0, 1, 0, 1, 0,
0, 1, 0, 1, 0, 1, 0, 1,
0, 0, 0, 0, 0, 0, 0, 0,
0, 0, 0, 0, 0, 0, 0, 0,
2, 0, 2, 0, 2, 0, 2, 0,
0, 2, 0, 2, 0, 2, 0, 2,
2, 0, 2, 0, 2, 0, 2, 0
];






var count=0;
var direction= "";
var canMove = true;
var board = document.getElementsByClassName("board")[0];
var rowBlock = document.getElementsByClassName("rowBlock");
var columnBlock = document.getElementsByClassName("columnBlock");
var pieceSelected=false;
var normalIndex=[];

console.log(board);
//************************************** */
//************************************** */
//**************frazers notes!************************ */
//************************************** */
//************************************** */
//draughts
//need a board
//need pieceis

//useful example i found https://github.com/codethejason/checkers
//borrowed the grid

//grid uses sets that are easier to check with
//1 and 2 for checkers for different players, 0 empty squares
//********************************************************* */
//********************************************************* */

//general game logic
//first step put the pieces on the board XX
//NEXT STEP move them XX
//for move onclick that checks if previous clicked was piece XX
//add highlight effect for when click? XX
//need to actually move the pieces now 19/05 XX
// put rules in for movement by adding a check relative to where it is in grid and index!XX
//how tho?XX
//first step XX
//limit movementXXX
//21/05
//add taking and jumps
//-----so ive added double jumps that know they are double jumps-- i need to implement loss of pieces now
//k so i broke the logic for the start of program for whether or not you have selected a piece previously
//it works now with mostly ifs rather than else if so  iguess thats easier to undertsand for later
//need to fix* act of taking pieces
//logic was wierd still is
//just need to update grid properly nad remove peices now
//have added remove pieces this morning 
//25/05
//need to add turn system and
// *i mean implement tbh
//done that i think
//NO need to stop it skipping turns for selectingp ieces
//Stopped it skipping
//need to add double jumps and then kings arent any other rules?
//also need to properly comment everything
//**************END OF frazers notes!************************ */
//************************************** */
//************************************** */
//************************************** */
//************************************** */

var game ={
  hasMoved:true,
  playerTurn:"red",
  previousPiece:{
id:0,
color:"white"
  },
currentPiece :{
  color:"white",
  present:false,
  id:0,
  //changes pieces sides and place on board
  idMethod: function(id){

    if(columnBlock[id].style.backgroundColor === "blue"){
      game.currentPiece.color="blue"
      game.currentPiece.id = 2;
      game.currentPiece.present = true;

    }
    else if(columnBlock[id].style.backgroundColor === "red"){
game.currentPiece.color="red"
game.currentPiece.id = 1;
game.currentPiece.present = true;

    }
    else{
      game.currentPiece.color="white"
      game.currentPiece.id = 0;
      game.currentPiece.present = false;

    }
  }

},
result:0,
badMove: function (){


  game.hasMoved =false;

  canMove=false;

  window.alert("cant move btw");
},
//colours the board
     findPieces :function() 
     {
     for(i=0;i<grid.length;i++){
      game.result = grid[i];
      
      if(game.result==1){

        columnBlock[i].style.backgroundColor = "red";


      }
      else if(game.result>0)
      {

        columnBlock[i].style.backgroundColor = "blue";
      }
      else{
        columnBlock[i].style.backgroundColor = "white";

      }
    

}
    },
    //this is gonna check each grid
    //gettin in to programming again..
    //mad anxiety not helping
    //DO THIS
//take on click event id so the index of grid squqare clicked
//...this is passed to basically everything..... badddd

    canWeMove :function(id){
      if( game.previousPiece.color == game.playerTurn ){

        

   

      var calc = normalIndex[id]-normalIndex[this.previousPiece.id];
      console.log("the calc " +calc);

      normalJump(id);
      
      function normalJump(id){
        console.log("attempting normal jump");
        if(game.previousPiece.color=="red"){
        if(calc==7||calc==9){
          canMove=true;

          game.movePiece(id,game.previousPiece.color)
        }
        else{
          console.log("attempting to take ");

    checkAdjacent(id);


        }
      }
        
        else{
            //check for normal movement
            //put in another function that takes color and id for current
        
          if(calc==-7||calc==-9){
            canMove=true;

            game.movePiece(id);
        }
        else{
          console.log("attempting to take ");

          checkAdjacent(id);

        }
      }
    }
  }
  else{
    return window.alert("Its " + game.playerTurn +" turn not yours")
  }
function checkAdjacent(id){

  console.log("should check if we can take instead of  jump ");
  
  if(  game.previousPiece.color=="red"||game.previousPiece.type=="king" ){


    console.log(grid[id]);
  if(grid[+id-9]==2||grid[+id-7]==2){
console.log("we should  take");
    takePiece(calc,"red");
  }
  else{
    console.log("DEAD END");

    game.badMove();
    }

}

 else if(game.previousPiece.color=="blue"||game.previousPiece.type=="king"){
   if(grid[+id+9] ==1 || grid[+id+7] ==1){
    console.log("we should  take");

    takePiece(calc,"blue");
  }
  else{

    console.log("Dead End");

    game.badMove();
    
  }

}

}



 function takePiece(calc,color){
//wat direction we going 
  if(calc == 18){

     direction = "down"
  }
  if(calc == 14){
    direction = "up"

  }
   if(calc == -18){
    direction = "up"
 }
  if(calc == -14){
   direction = "down"

 }


   console.log("entered take")
   if(  color=="red"){

    console.log("triggered red on take check")

     //so 14 ,26 to 40, 33 next door
   if(direction == "down"){
     console.log("going down red peice");
    canMove=true;

//just checking if adjacent piece is actually right not needed really
if(grid[+id-9]==2){
  canMove=true;
  console.log("take it");

 return game.movePiece(id, id-9, color);//this will pass coords for removing piece by changing color/id

}
   }
if(direction == "up"){
      console.log("going up red peice");

if(grid[+id-7]==2){
  canMove=true;
  console.log("take it jump");

  return game.movePiece(id,id-7,color);

}
else{

  game.badMove();
        }
  }
      
     }

  if(color == "blue"){

    if(direction =="down"){
      console.log("going down blue" )

      if(grid[+id+7]==1){
        console.log("take it jump");

      canMove=true;
      return    game.movePiece(id, +id+7, color);
      }
      else{
        game.badMove();
      }
    }

    
    if(direction =="up"){
      console.log("going up blue")

      if(grid[+id+9]==1){
        console.log("take it  jump");

      canMove=true;
      return   game.movePiece(id, +id+9,color);
      }
      else{
        game.badMove();
      }
    }
    else{
      window.alert("no direction???");
    }

  }
}



  },


    watpieceSelected: function(e)
     //tracks where we at
     //current selected and previous selected
    {


      if(game.currentPiece.id==2){

        console.log("blue draught");
        game.currentPiece.color="blue";

        game.previousPiece.id = e;
          game.previousPiece.color= this.currentPiece.color;
count++;
         console.log(  " at " + game.previousPiece.id);

  updateGrid();
      }
      //tracking current and previous selected piece
       if(game.currentPiece.id==1) {
        console.log("red draught");

        game.currentPiece.color="red";
        game.currentPiece.present=true;
        game.previousPiece.color=this.currentPiece.color;

         game.previousPiece.id = e;

         console.log( " at " + game.previousPiece.id);
count++;

         updateGrid();
      }

       if(count>=1 && game.currentPiece.id==0){
         count=0;
        this.canWeMove(e);

        console.log("piece at " +game.previousPiece.id+ " should move  to " + e);
    //lets you just move board peices with 0 rules 

    pieceSelected=false;

        updateGrid();

      }
      else if(count<1) {
        
        console.log("no draught");

         game.currentPiece.present =false;
         game.currentPiece.color="white";
         game.previousPiece.id = e;
         game.previousPiece.color=this.currentPiece.color;

         pieceSelected=false;

        
      }
    },
    //this should change index of previously 
    //selected piece to current selected when its added lmaos
    

    //all this does is move location on page and grid
    movePiece: function(e,thingToDelete,color){
   

      game.hasMoved =true;
      if(game.previousPiece.color=="red"){
        game.playerTurn = "blue";
        }
         else if(game.previousPiece.color=="blue"){
          game.playerTurn = "red";
        
        }
console.log("moved to" + e); 
  columnBlock[e].style.backgroundColor =game.previousPiece.color; 
  columnBlock[game.previousPiece.id].style.backgroundColor=game.currentPiece.color;
  if(thingToDelete){
    console.log(thingToDelete + " is the value of thing to dlete");
    columnBlock[thingToDelete].style.backgroundColor="white";

  }

  updateGrid();

    }
     
    



//end of game object
}



function updateGrid(){
  //updates grid lol
  //resets each run and rebuilds it
  //this is probably a bad way of dooing it too resource expensive??

  grid=[];
  normalIndex=[];
  for(i=0;i<columnBlock.length;i++){

    normalIndex.push(i);
if(columnBlock[i].style.backgroundColor==="red"){
grid.push(1);
}
else if(columnBlock[i].style.backgroundColor==="blue"){
  grid.push(2);

}
else{
  grid.push(0);

}
  }
}
function giveIdAndOnclick(){
  
    for(var i = 0; i < columnBlock.length; i++){
        columnBlock[i].setAttribute("id",i);



        columnBlock[i].onclick = function(e){
          e= e.target;
          console.log(e.id);

          game.currentPiece.idMethod(e.id);//id neededfor checking background color
     game.watpieceSelected(e.id);

  
        };
     
}}



makeGrid();
//borrowed from stackover flow for conveniece

function makeGrid() {
  //
  makeRow(8);
  makeCol(8);
}

function makeRow(amount) {

  for (i = 0; i < amount; i++) { //how many divs you want?
      //create a div
      var row = document.createElement("div");
      //give class name
      row.className = "rowBlock";
      //append new div to the existing container div
      board.appendChild(row);


  }


}

function makeCol(amount) {
  for (i = 0; i < rowBlock.length; i++) {
      for (a = 0; a < amount; a++) { //loop through each existing rowblock so we can append new divs to them
          //create new div 
          var columnBlock = document.createElement("div");
          //give class name

          columnBlock.className = "columnBlock";
          //append new div to the created div so that they make a column

          rowBlock[a].appendChild(columnBlock);


      }


  }
}
game.findPieces();
giveIdAndOnclick();
