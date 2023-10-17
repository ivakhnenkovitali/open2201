<?php
include('blocks/db.php');
if ($_GET['add'])
    if (
        !empty($_POST['item'])  &&
        !empty($_POST['price']) &&
        !empty($_POST['quantiry'])
    ) {
        $db->query("INSERT INTO `tovar` (`id_tov`, `item`, `quantiry`, `price`, `done`) VALUES (NULL, 
    '" . $_POST['item'] . "', 
    '" . $_POST['quantiry'] . "', 
    '" . $_POST['price'] . "',
     '1');");
    }
?>

<header>
    <h1>Список товаров</h1>
    <div class=line></div>
    <form action="" method="POST">
        <input type="text" placeholder="Добавить товар" name="item">
        <input type="number" placeholder="Количество" name="quantiry" min=0>
        <input type="number" placeholder="Цена" name=price min=0>
        <input type="submit" value="Добавить товар" name=add>
    </form>
</header>