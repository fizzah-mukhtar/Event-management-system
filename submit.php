<?php
	$FirstName = $_POST['FirstName'];
    $LastName = $_POST['LastName'];
    $Address = $_POST['Address'];
    $EMail = $_POST['EMail'];
    $PhoneNo = $_POST['PhoneNo'];
    $CNIC = $_POST['CNIC'];
    $Tickets = $_POST['Tickets'];
    $Date = $_POST['Date'];
    $Venue = $_POST['Venue'];
    $EventType = $_POST['EventType'];
    $PaymentType = $_POST['PaymentType'];
    $id = $_POST['id'];
    
	// Database connection
	$conn = new mysqli('localhost','root','','booking1');
	if($conn->connect_error){
		echo "$conn->connect_error";
		die("Connection Failed : ". $conn->connect_error);
	} else {
		$stmt = $conn->prepare("insert into booking(FirstName,LastName,Address,EMail,PhoneNo,CNIC,Tickets,Date,Venue,EventType,PaymentType,id) 
        values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
		$stmt->bind_param("ssssiiiisssi",$FirstName,$LastName,$Address,$EMail,$PhoneNo,$CNIC,$Tickets,$Date,$Venue,$EventType,$PaymentType,$id);
		$execval = $stmt->execute();
		echo $execval;
		echo "Registration successfully...";
		$stmt->close();
		$conn->close();
	}
?>