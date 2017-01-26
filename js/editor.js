// Send iFrame resize message to the parent
function resize() {
	var height = document.getElementsByTagName("html")[0].scrollHeight;
	window.parent.postMessage(["setHeight", height], "*"); 
}

function unhighlightError() {
	for (var i = 1000 - 1; i >= 0; i--) {
		editor.getSession().removeMarker(i);
	}
}

function highlightError(lineNumber) {
  
  var Range = ace.require("ace/range").Range
  erroneousLine = editor.session.addMarker(new Range(lineNumber, 0, lineNumber, 144), "errorHighlight", "fullLine");
}

function highlightEditorErrors(cmpErrorText){
	//Store the error string in an array and then call function to highlight individual lines
	// Split lines by \n
	var array = cmpErrorText.split('\n');
	//var arrayLength = array.length;
	for (var i = array.length - 1; i >= 0; i--) {
		var myRegexp = /.*:(.*):.*:\s(error)/;
		var match = myRegexp.exec(array[i]);
		if ( match !== null ) {
			console.log('Error in line ' + match[1]--);
			highlightError(match[1]--);
		}
	}
}

var defaultC = '#include <stdio.h>\n\nint main() {\n\t//code\n\treturn 0;\n}';
var defaultCPP = '#include <iostream>\nusing namespace std;\n\nint main() {\n\t//code\n\treturn 0;\n}';
var defaultJava = 'import java.util.*;\nimport java.lang.*;\nimport java.io.*;\n\nclass SK {\n\tpublic static void main (String[] args) {\n\t\t//code\n\t}\n}';
var defaultPython = '#code';
var lang;
//var cstmInpt;

var editor = ace.edit("editor");
//editor.setTheme("ace/theme/monokai");
editor.setTheme("ace/theme/chrome");
//editor settings
var norOps = {
	minLines: 25,
	maxLines: null,
	fontSize: "12pt"
};
editor.setOptions( norOps );
//editor.getSession().setMode("ace/mode/javascript");
editor.getSession().setMode("ace/mode/c_cpp");
editor.$blockScrolling = Infinity;
editor.getSession().setValue(defaultC);
lang = 1; // Default is C
//Clear all markers if we edit the code
editor.on("input", function() {
	if ( !editor.session.getUndoManager().isClean() ) {
		unhighlightError();
	}
});

$( document ).ready(function() {
    console.log( "ready!" );
	$( "#c" ).click(function() {
		console.log( "C Pressed" );
		editor.getSession().setMode("ace/mode/c_cpp");
		//var text_c = editor.getSession().getValue();
		editor.getSession().setValue(defaultC);
		lang = $(this).children('input').attr('value');
		//console.log(lang);
	});
	$( "#cpp" ).click(function() {
		console.log( "Cpp Pressed" );
		editor.getSession().setMode("ace/mode/c_cpp");
		editor.getSession().setValue(defaultCPP);
		lang = $(this).children('input').attr('value');
	});
	$( "#java" ).click(function() {
		console.log( "Java Pressed" );
		editor.getSession().setMode("ace/mode/java");
		editor.getSession().setValue(defaultJava);
		lang = $(this).children('input').attr('value');
	});
	$( "#python" ).click(function() {
		console.log( "Python Pressed" );
		editor.getSession().setMode("ace/mode/python");
		editor.getSession().setValue(defaultPython);
		lang = $(this).children('input').attr('value');
	});
	$( "#run" ).click(function() {
		// Mark the editor to monitor any change (for removing markers)
		editor.session.getUndoManager().markClean();
		// Continue forward
		var cstmInpt = $("#customInput").val();
		$(this).attr( "disabled", "disabled" );
		$( ".out pre" ).text( 'Evaluating...' );
		// Resize here (visual effect only)
		resize();
		$.ajax({
			type: "POST",
			url: 'submit.php',
			data: { lang: lang, code: editor.getSession().getValue(), input: cstmInpt },
			dataType: "json",
			success: function( data ) {
				// data.result.stdout
				//$( ".out pre" ).text( JSON.stringify(data) );
				// Remove previous highlighted lines
				unhighlightError();
				//Print the data to console for debugging
				console.log(data);
				if (data.result.compilemessage != '') {
					// Word-around for the encoding problem. Remove later.
					data.result.compilemessage = data.result.compilemessage.replace(/â/g, '\'');
					data.result.compilemessage = data.result.compilemessage.replace(/â/g, '\'');
					$( ".out pre" ).text( 'Compilation Error:\n' + data.result.compilemessage );
					// Resize here (visual effect only)
					resize();
					highlightEditorErrors(data.result.compilemessage);
				} else {
					$( ".out pre" ).text( 'Compilation Success:\n' + data.result.stdout );
					// Resize here (visual effect only)
					resize();
				}
			},
			error: function(jqXHR, exception, errorThrown) {	
				$( ".out pre" ).text( 'Error / Run Time Error.\nTry again' );
				// Resize here (visual effect only)
				resize();
				console.log(exception);
				/*$( ".err" ).show().delay(5000).slideUp(200, function() {
					$(this).hide();
				});*/
			},
			complete: function() {
				$("#run").removeAttr( "disabled" );
			}
		});
	});
});