<?php
include "config.php";

$type = 0;
if(isset($_POST['type'])){
    $type = $_POST['type'];
}
// Search result
if($type == 1){
    $searchText = mysqli_real_escape_string($con,$_POST['search']);

    $sql = "SELECT id,name,description,image FROM searchResult where name like '%".$searchText."%' order by name asc limit 5";

    $result = mysqli_query($con,$sql);

    $search_arr = array();

    while($fetch = mysqli_fetch_assoc($result)){
        $id = $fetch['id'];
        $name = $fetch['name'];
        $description = $fetch['description'];
        $image = $fetch['image'];

        $search_arr[] = array("id" => $id, "name" => $name, "description" => $description, "image" => $image);
    }

    echo json_encode($search_arr);
}

// get User data
if($type == 2){
    $userid = mysqli_real_escape_string($con,$_POST['userid']);

    $sql = "SELECT name,description,image FROM searchResult where id=".$userid;

    $result = mysqli_query($con,$sql);

    $return_arr = array();
    while($fetch = mysqli_fetch_assoc($result)){
        $name = $fetch['name'];
        $description = $fetch['description'];
        $image = $fetch['image'];

        $return_arr[] = array("name"=>$name, "description"=> $description, "image"=> $image);
    }

    echo json_encode($return_arr);
}


