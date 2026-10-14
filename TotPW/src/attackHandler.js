let attackFrame     = 0;              //Counts frames since an attack started
let nextAttackFrame = 30;             //Once attackFrame reaches this number, an attack happens and attack frame resets
let currentAttack   = 0;              //Controls what will happen when an attack happens and how long nextAttackFrame is
let attacks         = 0;              //Goes up everytime an attack happens, once it goes up a certain amount a new attack starts, then it resets

function attack() {
  //attack function, most logic surrounding the main attack loop is stored here

  if (attackFrame >= nextAttackFrame) {
    if (player.dif === 1) {
      if (currentAttack === 0) {
        createBullets(":P", 7,575,25,575,25,5,0+(attacks*5),360+(attacks*5),8,0);
        createBullets(":P", 7,25,25,25,25,5,0+(attacks*5),360+(attacks*5),8,0);
        
        if (attacks >= 50) {    //once the attack has been repeated a set amount of times, do these actios
          attacks = 0;          //reset attack counter to 0
          currentAttack += 1;   //switch to next attack in the loop
          player.scr += 10;     //add 10 the the player score for surviving the attack
        }
      }

      else if (currentAttack === 1) {
        createBullets(":P", 15,-500+(attacks*10),25,575+(attacks*10),25,4,90,90,8,0);
        createBullets(":P", 15,-500+(attacks*10),575,575+(attacks*10),575,4,270,270,8,0);
        
        if (attacks >= 50) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 2) {
        createBullets(":P", 8,-500+(attacks*10),25,575+(attacks*10),25,3,90,90,8,0);
        createBullets(":P", 8,25,-500+(attacks*10),25,575+(attacks*10),3,0,0,8,0);
        
        if (attacks >= 50) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 3) {
        createBullets(":P", 7,-500+(attacks*10),25,575+(attacks*10),25,4,90,90,8,0.2);
        createBullets(":P", 7,25,-500+(attacks*10),25,575+(attacks*10),4,0,0,8,0.2);
        
        if (attacks >= 50) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 4) {
        createBullets(":P",10,-15,25,550,25,6,90,90,8,0);
        createBullets(":P",2,575,0+((Math.sin(radians(45*attacks)))*100),575,400+((Math.sin(radians(45*attacks)))*100),3,180,180,8,0);
        
        if (attacks >= 50) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else {
        createBullets(":P", 10,275,275,275,275,5,0+(attacks*10),360+(attacks*10),8,0);

        if (attacks >= 50) {
          attacks = 0;
          currentAttack = 0; //reset the current attack, restarting the loop
          player.scr += 10; 
          if (nextAttackFrame > 10) {
            nextAttackFrame -= 1;
          } //makes the next loop slightly harder up to a set limit
        }
      }
    }

    else if (player.dif === 2) {
      if (currentAttack === 0) {
        createBullets(":P", 13,575,25,575,25,5.5,0+(attacks*5),360+(attacks*5),8,0);
        createBullets(":P", 13,25,25,25,25,5.5,0+(attacks*5),360+(attacks*5),8,0);
        
        if (attacks >= 60) {    
          attacks = 0;          
          currentAttack += 1;   
          player.scr += 10;     
        }
      }

      else if (currentAttack === 1) {
        createBullets(":P", 20,-600+(attacks*10),25,575+(attacks*10),25,6,90,90,8,0);
        createBullets(":P", 20,-600+(attacks*10),575,575+(attacks*10),575,6,270,270,8,0);
        
        if (attacks >= 60) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 2) {
        createBullets(":P", 12,-600+(attacks*10),25,575+(attacks*10),25,3,90,90,8,0);
        createBullets(":P", 12,25,-600+(attacks*10),25,575+(attacks*10),3,0,0,8,0);
        
        if (attacks >= 60) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 3) {
        createBullets(":P", 15,-750+(attacks*10),25,575+(attacks*10),25,5,90,90,8,0.2);
        createBullets(":P", 15,25,-750+(attacks*10),25,575+(attacks*10),5,0,0,8,0.2);
        
        if (attacks >= 60) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 4) {
        createBullets(":P",13,-15,25,550,25,7,90,90,10,0);
        createBullets(":P",4,575,0+((Math.sin(radians(15*attacks)))*100),575,500+((Math.sin(radians(15*attacks)))*100),5,180,180,8,0);
        
        if (attacks >= 60) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 5) {
        createBullets(":P", 20,275,275,275,275,5,0+(attacks*10),360+(attacks*10),8,0);

        if (attacks >= 60) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 6) {
        createBullets(":P", 8,25,25,25,25,6,0+(attacks*10),360+(attacks*10),8,0);
        createBullets(":P", 8,575,25,575,25,5.5,0+(attacks*10),360+(attacks*10),8,0);
        createBullets(":P", 8,25,575,25,575,6.5,0+(attacks*10),360+(attacks*10),8,0);
        createBullets(":P", 8,575,575,575,575,5.5,0+(attacks*10),360+(attacks*10),8,0);
        
        if (attacks >= 60) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else {
        createBullets(":P",6,575,0+((Math.sin(radians(15*attacks)))*100),575,500+((Math.sin(radians(15*attacks)))*100),5,180,180,8,0);
        createBullets(":P",6,0+((Math.sin(radians(15*attacks)))*100),575,500+((Math.sin(radians(15*attacks)))*100),575,5,270,270,8,0);

        if (attacks >= 60) {
          attacks = 0;
          currentAttack = 0;
          player.scr += 10; 
          if (nextAttackFrame > 7) {
            nextAttackFrame -= 1;
          }
        }
      }
    }

    else if (player.dif >= 3) {
      if (currentAttack === 0) {
        createBullets(":P", 18,575,25,575,25,5.5,0+(attacks*5),360+(attacks*5),8,0);
        createBullets(":P", 18,25,25,25,25,5.5,0+(attacks*5),360+(attacks*5),8,0);
        
        if (attacks >= 70) {    
          attacks = 0;          
          currentAttack += 1;   
          player.scr += 10;     
        }
      }

      else if (currentAttack === 1) {
        createBullets(":P", 25,-600+(attacks*10),0,575+(attacks*10),0,4,90,90,8,0);
        createBullets(":P", 25,-600+(attacks*10),600,575+(attacks*10),600,4,270,270,8,0);
        
        if (attacks >= 70) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 2) {
        createBullets(":P", 16,-600+(attacks*10),25,575+(attacks*10),25,2,90,90,8,0);
        createBullets(":P", 16,25,-600+(attacks*10),25,575+(attacks*10),2,0,0,8,0);
        
        if (attacks >= 70) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 3) {
        createBullets(":P", 16,-750+(attacks*10),25,575+(attacks*10),25,5.5,90,90,8,0.2);
        createBullets(":P", 16,25,-750+(attacks*10),25,575+(attacks*10),5.5,0,0,8,0.2);
        
        if (attacks >= 70) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 4) {
        createBullets(":P",13,-15,25,550,25,7,90,90,8,0);
        createBullets(":P",8,575,0+((Math.sin(radians(15*attacks)))*100),575,500+((Math.sin(radians(15*attacks)))*100),4,180,180,8,0);
        
        if (attacks >= 70) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 5) {
        createBullets(":P", 25,275,275,275,275,6,0+(attacks*15),360+(attacks*15),8,0);

        if (attacks >= 70) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 6) {
        createBullets(":P", 12,25,25,25,25,6,0+(attacks*10),360+(attacks*10),8,0);
        createBullets(":P", 12,575,25,575,25,5.5,0+(attacks*10),360+(attacks*10),8,0);
        createBullets(":P", 12,25,575,25,575,6.5,0+(attacks*10),360+(attacks*10),8,0);
        createBullets(":P", 12,575,575,575,575,5.5,0+(attacks*10),360+(attacks*10),8,0);
        
        if (attacks >= 70) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 7) {
        createBullets(":P",8,575,0+((Math.sin(radians(15*attacks)))*100),575,500+((Math.sin(radians(15*attacks)))*100),4,180,180,8,0);
        createBullets(":P",8,0+((Math.cos(radians(15*attacks)))*100),575,500+((Math.cos(radians(15*attacks)))*100),575,4,270,270,8,0);
        
        if (attacks >= 70) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else if (currentAttack === 8) {
        createBullets(":P",13,-15,25,550,25,7,90,90,8,0);
        createBullets(":P",8,575,0+((Math.sin(radians((15*attacks)*(Math.sin(radians(15*attacks))))))*100),575,500+((Math.sin(radians((15*attacks)*(Math.sin(radians(15*attacks))))))*100),4,180,180,8,0);
        
        if (attacks >= 70) {
          attacks = 0;
          currentAttack += 1;
          player.scr += 10;
        }
      }

      else {
        createBullets(":P", 20,575,25+(attacks*7.5),575,25+(attacks*7.5),4,0+(attacks*15),360+(attacks*15),8,0);
        createBullets(":P", 20,25,575-(attacks*7.5),25,575-(attacks*7.5),4,0+(attacks*15),360+(attacks*15),8,0);

        if (attacks >= 70) {
          attacks = 0;
          currentAttack = 0; 
          player.scr += 10; 
          if (nextAttackFrame > 5) {
            nextAttackFrame -= 1;
          }
        }
      }
    }

    attacks += 1;    //add 1 to the attack counter
    attackFrame = 0; //reset attack waiting frame counter
  }

  attackFrame += 1; //add one to the frame counter
}