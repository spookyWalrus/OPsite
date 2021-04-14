<?PHP
// session_save_path('/Applications/XAMPP/xamppfiles/temp/');
session_start();
// session_save_path('/Applications/XAMPP/xamppfiles/temp/');

  // Original PHP code by Chirp Internet: www.chirp.com.au
  // Please acknowledge use of this code by including this header.

    function cleanData(&$str){
  
        if($str == 't') $str = 'TRUE';
        if($str == 'f') $str = 'FALSE';
        if(preg_match("/^0/", $str) || preg_match("/^\+?\d{8,}$/", $str) || preg_match("/^\d{4}.\d{1,2}.\d{1,2}/", $str)) {
          $str = "'$str";
        }
        if(strstr($str, '"')) $str = '"' . str_replace('"', '""', $str) . '"';
         // $str = mb_convert_encoding($str, 'UTF-16LE', 'UTF-8'); // include this so UTF-8 characters work in your xls file
     }

    function map_colnames($input){ // include this to map column headers seen in array above
        global $colnames;
        return isset($colnames[$input]) ? $colnames[$input] : $input;
     }


      // filename for download
      // $filename = "website_data_" . date('Ymd') . ".csv"; // use this for csv format
      // $filename = "website_data_" . date('Ymd') . ".xls"; // use this for excel format
      $userName = $_SESSION['username'];
      $startDate = $_SESSION['startdate'];
      $endDate = $_SESSION['enddate'];
      $filename = "Payroll_".$userName ."_". $startDate. ".xls"; // use this for excel format

      header("Content-Disposition: attachment; filename=\"$filename\"");

      // header("Content-Type: text/csv; charset=UTF-16LE"); // include this so UTF-8 unicode characters are intact in your xls file
      // header("Content-Type: text/csv"); // include this for basic csv format, not including UTF-8 characters...
      header("Content-Type: application/vnd.ms-excel"); // for excel format

      // $data = $_POST['makeExcel'];
      // $data = $_POST['makeExcel'];
      $data = $_SESSION['exceldata']; // sent from payRollTools.php

      $out = fopen("php://output", 'w');

      $flag = false;
      // $result = pg_query("SELECT * FROM table ORDER BY field") or die('Query failed!'); // query to gather from sql database
      // while(false !== ($row = pg_fetch_assoc($result))) {  // loop to fetch data from sql query
    foreach($data as $row) {  // loop to fetch data from array, output data that is saved as excel file

        if(!$flag) {
          // display field/column names as first row
    	      // $firstline = array_map(__NAMESPACE__ . '\map_colnames', array_keys($row));  // use this to map column headers
            // fputcsv($out, $firstline, ',', '"');  // use this to map column headers
    	     echo implode("\t", array_keys($row)) . "\r\n"; // use this for basic format where column headers are not mapped...
          $flag = true;
        }
        array_walk($row, __NAMESPACE__ . '\cleanData');
        fputcsv($out, array_values($row), ',', '"');
    }

      fclose($out);
      exit;

// }
?>

