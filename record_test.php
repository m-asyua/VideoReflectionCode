<?php

	if(isset($_GET['timer'])  ){
		$timer = $_GET['timer'];
	}else{
		$timer = 30000;
	}

echo <<<EOD


<!DOCTYPE html>

<!--
<html lang="en-us">
-->

<head>
    <meta charset="utf-8">
    <title>Record demo using Primrose</title>
    <script type="module" src="record_test.js"></script>
</head>

<body>

    <span hidden class="version-number" style="text-transform:none">v1.1.x</span>

    <select hidden id="demos">
            <option value="js" selected>JavaScript</option>
            <option value="html">HTML</option>
            <option value="bas">BASIC</option>
            <option value="txt">Plain Text</option>
    </select>
    <select hidden  id="themes">
        <option value="dark" selected>Dark</option>
        <option value="light">Light</option>
    </select>

    <canvas id="my_canvas"   style="width:600px;height:200px;max-height:40vh;"></canvas>


    <br>
	<input type="button" value="Edit"                    id = "edit_button">
	<input type="button" value="Compile and execute"     id = "execute_button">
	<input type="hidden" value="$timer" id="set_timer" > 
	<!--                        ^^^^^^  time is here     -->
	
	<input type="text" value="" id="timer" > 
	<span id="status" ><font color="#ff0000">[recording]</font></span>
	<input type="button"  value="Stop record"            id="stop_button" >
	<br>
	<table border="1">
		<tr>
		<td>
			<video width="500" height="150" id="recorded" playsinline ></video>
		</td>
		</tr>
	</table>

	<br>
	Speed 
	<select id="play_speed" >
		<option value="0.3">0.3</option>
		<option value="0.5">0.5</option>
		<option value="1" >1</option>
		<option value="1.5">1.5</option>
		<option value="2"  selected >2</option>
		<option value="3">3</option>
		<option value="4">4</option>
	</select>
	<br>


	<br>
	<p><a href="#" id="downloadlink" style="display:none;">Download (webm)</a></p>
	<br>

	<textarea hidden id="textarea_edit" rows="10" cols="10"></textarea><br>



</body>
</html>


EOD;

?>

