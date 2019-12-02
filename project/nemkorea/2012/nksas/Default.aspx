<html>
 <head>
 <title>Knob Control</title>
 <script type="text/javascript" for=iKnobX1   
   event="OnPositionChangeUser()">
  <!--
    iKnobX1_OnPositionChangeUser();
  //-->    
 </script>
 <script type="text/javascript">
     function iKnobX1_OnPositionChangeUser() {
         Text1.value = iKnobX1.Position;
     }
 </script>
 </head>
 <body>
 <OBJECT ID="iKnobX1" 
 CLASSID="clsid:C5412DC7-2E2F-11D3-85BF-00105AC8B715">
 </OBJECT>
 <input type="text" id="Text1"> 
 </body>
 </html> 

