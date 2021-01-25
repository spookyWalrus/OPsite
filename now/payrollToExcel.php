
<?PHP
// script to output array rows as csv file 


// below is associative array used for example script below
  $data = [
    ["payrollstart" =>'2020-10-15',"payrollend"=>'2020-10-29'],
    ["blank"=>''], // spacer
    ["firstname"=>'First Name',"lastname"=>'Last Name',"id"=>'ID'], // headers for columns
    ["firstname" => "Mary", "lastname" => "Johnson", "id" => '121454'],
    ["blank"=>' '],
    ["Week 1"=>"week 1"],
    ["Date"=>"Date","Total Hours"=>"TotalHours","Event name"=>"Event name","Event code"=>"Event code","Event location"=>"Event location"], //header for columns
    ["Date"=>"2020-03-11","Total Hours"=>"7.5","Event name"=>"Dancehall fever","Event code"=>"989898","Event location"=>"OP"],
    ["Date"=>"2020-03-13","Total Hours"=>"11.5","Event name"=>"Orchestre de Montreal"],
    ["firstname" => "Amanda", "lastname" => "Miller", "age" => '17:18:43'],
    ["firstname" => "James", "lastname" => "Brown", "age" => '$31'],
    ["firstname" => "Patricia", "lastname" => "Williams", "age" => 7],
    ["firstname" => "Michael", "lastname" => "Davis", "age" => 43],
    ["firstname" => "Sarah", "lastname" => "Miller", "age" => 24],
    ["firstname" => "Patrick", "lastname" => "Miller", "age" => 27]
  ];

   $colnames = [ // object used to map the column headers
    'memberno' => "Member No.",
    'date_joined' => "Date joined",
    'title' => "Title",
    'firstname' => "First name",
    'lastname' => "Last name",
    'address' => "Address",
    'postcode' => "Postcode",
    'city' => "City",
    'country' => "Country",
    'phone' => "Telephone",
    'mobile' => "Mobile",
    'fax' => "Facsimile",
    'email' => "Email address",
    'notes' => "Notes",
    'payrollstart' =>"Pay Roll Start Date",
    'payrollend' =>"Pay Roll End Date",
    'blank'=>"  "
  ];


?>

<?PHP
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
  $filename = "website_data_" . date('Ymd') . ".xls"; // use this for excel format

  header("Content-Disposition: attachment; filename=\"$filename\"");

  // header("Content-Type: text/csv; charset=UTF-16LE"); // include this so UTF-8 unicode characters are intact in your xls file
  // header("Content-Type: text/csv"); // include this for basic csv format, not including UTF-8 characters...
  header("Content-Type: application/vnd.ms-excel"); // for excel format

  $out = fopen("php://output", 'w');

  $flag = false;
  // $result = pg_query("SELECT * FROM table ORDER BY field") or die('Query failed!'); // query to gather from sql database
  // while(false !== ($row = pg_fetch_assoc($result))) {  // loop to fetch data from sql query
foreach($data as $row) {  // loop to fetch data from array, output data that is saved as excel file

    if(!$flag) {
      // display field/column names as first row
	      $firstline = array_map(__NAMESPACE__ . '\map_colnames', array_keys($row));  // use this to map column headers
        fputcsv($out, $firstline, ',', '"');  // use this to map column headers
	     // echo implode("\t", array_keys($row)) . "\r\n"; // use this for basic format where column headers are not mapped...
      $flag = true;
    }
    array_walk($row, __NAMESPACE__ . '\cleanData');
    fputcsv($out, array_values($row), ',', '"');
}

  fclose($out);
  exit;
?>

 <?PHP
//   function cleanDataBasic(&$str)
//   {
//     $str = preg_replace("/\t/", "\\t", $str);
//     $str = preg_replace("/\r?\n/", "\\n", $str);
//     if(strstr($str, '"')) $str = '"' . str_replace('"', '""', $str) . '"';
//   }

  // filename for download
  // $filename = "website_data_" . date('Ymd') . ".xls";

  // header("Content-Disposition: attachment; filename=\"$filename\"");
  // header("Content-Type: application/vnd.ms-excel");

  // $flag = false;
  // foreach($data as $row) {
  //   if(!$flag) {
  //     // display field/column names as first row
  //     echo implode("\t", array_keys($row)) . "\r\n";
  //     $flag = true;
  //   }
  //   array_walk($row, __NAMESPACE__ . '\cleanDataBasic');
  //   echo implode("\t", array_values($row)) . "\r\n";
  // }
  // exit;
?> 

