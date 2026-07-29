<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

$filename = 'svg-icons.svg';

if (file_exists($filename)) {
    // Attempt to delete the file
    if (unlink($filename)) {        
    } else {
        echo "Something is wrong";
    }
}

$svg_sprits = [];

// Get all SVG files in the current directory
$svgFiles = glob("*.svg");

// Check if any SVG files were found
if (!empty($svgFiles)) {
    foreach ($svgFiles as $file) {

    		// Get the content of the SVG file
        $htmlContent = file_get_contents($file);

        if ($htmlContent !== false) {
            // Extract the value of the viewBox attribute using a regular expression
            if (preg_match('/viewBox="([^"]+)"/', $htmlContent, $matches)) {
                $viewBoxValue = $matches[1];                
            }
        }


        // Load the HTML into DOMDocument
				$dom = new DOMDocument();
				libxml_use_internal_errors(true); // Suppress errors for invalid HTML
				$dom->loadHTML($htmlContent, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
				libxml_clear_errors();

				// Get the <svg> element
				$svgElement = $dom->getElementsByTagName('svg')->item(0);

				// Extract the innerHTML
				$innerHTML = '';
				if ($svgElement) {
				    foreach ($svgElement->childNodes as $child) {
				        $innerHTML .= $dom->saveHTML($child);
				    }
				}
				$innerHTML; // Outputs the innerHTML of the <svg> element


        $svg_sprits[$file] = [
        	'id' => str_replace(".svg", "", $file),
        	'viewbox' => $viewBoxValue,
        	'content' => $innerHTML,
        ];
    }
} else {
    echo "No SVG files found in the current directory." . PHP_EOL;
}


// Generate Sprits File
$sprits_file_contents = '<svg class="svg" xmlns="http://www.w3.org/2000/svg">';
foreach ($svg_sprits as $key => $value) {	
	$sprits_file_contents .= '
		<symbol id="'.$value['id'].'-symbol" viewBox="'.$value['viewbox'].'">
        '.$value['content'].'
    </symbol>
	';
}
$sprits_file_contents .= '</svg>';



file_put_contents($filename, $sprits_file_contents);
echo 'Success! File name is <strong>'.$filename.'</strong>';


?>
