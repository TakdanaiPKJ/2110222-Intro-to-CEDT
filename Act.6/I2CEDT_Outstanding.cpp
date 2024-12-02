// C++ code
//

String morse [50] = {".-", "-...", "-.-.", "-..",".", "..-.", "--.", "....", "..", ".---",
                   "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-",
                   "..-", "...-", ".--", "-..-", "-.--", "--..", ".----", "..---", "...--",
                   "....-", ".....", "-....", "--...", "---..", "----.", "-----"};
String letter [50] = {"A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
                    "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
                    "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4",
                    "5", "6", "7", "8", "9", "0"};
String ans = "";

void setup()
{
    pinMode(8, OUTPUT);
    pinMode(3, INPUT);
    Serial.begin(9600);
}

void loop()
{
    digitalWrite(8, LOW);
    //Serial.println(Serial.read());
    //Serial.print(digitalRead(3));
    //delay(1000); // Wait for 1000 millisecond(s)

    int rd = Serial.read();
    bool rec = true;
    if(rd!=1){
        if(rd=='s'){
            String ip = "";
            Serial.println("Start Recording");
            while (rec){
                int cnt =0;
                while (!digitalRead(3)){
                    if(Serial.read()=='n'){
                        rec = false;
                        break;
                    }
                }
                while (digitalRead(3)){
                    digitalWrite(8, HIGH);
                    cnt ++ ;
                    delay(1);
                }
                digitalWrite(8, LOW);
                if(cnt >= 300){
                    ip+='-';
                    Serial.println("-");
                    cnt =0;
                } 
                else if(cnt>0) {
                    ip+=".";
                    Serial.println(".");
                    cnt =0;
                }
                
            }
            Serial.println("Finished Recording");
            Serial.println(ip);

            for(int i=0;i<36;i++){
                if(ip == morse[i]){
                    ans += letter[i];
                    Serial.println(letter[i]);
                    break;
                }
            }
            

        }
        if(rd == 'r'){
            Serial.print("Result : ");
            Serial.println(ans);
            ans = "";
        }
    }

}