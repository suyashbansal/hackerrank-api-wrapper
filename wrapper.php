<!DOCTYPE html>
<html lang="en">
<head>
<title>StudyKorner Compiler</title>
<style type="text/css" media="screen">
    #editor { 
        /*position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;*/
        height: 300px;
    }
    .errorHighlight {
		position:absolute;
		/*background:rgba(2,117,216,0.5);*/
		background:rgba(255,0,0,0.5);
		z-index:20
	}
</style>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
</head>
<body onLoad="resize();">

<h3>Code Editor</h3>
<form>
	<fieldset class="form-group">
    	<legend>Choose Language</legend>
		<div class="btn-group" data-toggle="buttons">
		  <label class="btn btn-primary btn-block active" id="c">
		    <input type="radio" name="options" id="c" autocomplete="off" checked value="1"> C
		  </label>
		  <label class="btn btn-primary" id="cpp">
		    <input type="radio" name="options" id="cpp" autocomplete="off" value="2"> C++
		  </label>
		  <label class="btn btn-primary" id="java">
		    <input type="radio" name="options" id="java" autocomplete="off" value="3"> Java
		  </label>
		  <label class="btn btn-primary" id="python">
		    <input type="radio" name="options" id="python" autocomplete="off" value="5"> Python
		  </label>
		</div>
	</fieldset>
	<div id="editor"></div>
	<legend>Input</legend>
	<textarea id="customInput" rows="3" class="w-100"></textarea>
	<legend class="mt-3">Result</legend>
        <div class="out">
            <pre style="font-size:17px;"></pre>
        </div>
        <!-- <div class="alert alert-danger" role="alert" style="display:none;">
			<strong>Oh snap!</strong> Change a few things up and try submitting again.
		</div> -->
	<button type="submit" class="btn btn-primary mt-3" id="run">Submit</button>
</form>
<!-- <script src="./ace-builds/src-noconflict/ace.js" type="text/javascript" charset="utf-8"></script> -->
<script src="//ajaxorg.github.io/ace-builds/src-min-noconflict/ace.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript" src="js/editor.js"></script>
</body>
</html>