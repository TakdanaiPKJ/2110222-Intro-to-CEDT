// C++ code
//

const int ans = 27270;
int chk;

void setup(){
    pinMode(13, OUTPUT);
    pinMode(12, OUTPUT);
    pinMode(11, OUTPUT);
    pinMode(2, INPUT);
    pinMode(7, INPUT);
    Serial.begin(9600);
}

void loop(){

    chk = 0;
    for (int i = 0; i < 4; i++){
        while (digitalRead(2) == 0 && digitalRead(7) == 0)
        {
            delay(1);
        }
        char tmp = (digitalRead(2) == 1 ? 2 : 7);
        chk += tmp;
        chk *= 10;
        delay(500);
    }
    if (chk == ans){
        digitalWrite(11, HIGH);
        digitalWrite(12, LOW);
        digitalWrite(13, LOW);
    }
    else {
        digitalWrite(11, LOW);
        digitalWrite(12, LOW);
        digitalWrite(13, HIGH);
    }
    Serial.println(chk);
}