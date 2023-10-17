<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=a, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <div id=container>
        <?php
        include('blocks/db.php');
        include('blocks/menu.php')
        ?>

        <div class='right_span'>
            <?php
            if (!isset($_GET['id_tov']))
                $_GET['id_tov'] = 1;

            if ($_POST['edit'])
                $db->query("UPDATE `tovar` SET `item` = '" . $_POST['item'] . "',
 `quantiry` = '" . $_POST['quantiry'] . "',
  `price` = '" . $_POST['price'] . "'
    WHERE `tovar`.`id_tov` = " . $_GET['id_tov'] . ";");

            $tt = $db->query("SELECT `id_tov`, `item`, `quantiry`, `price`, `done` FROM `tovar`
            WHERE `id_tov`=" . $_GET['id_tov'] . ";")->fetch_assoc();
            // echo $tt['id_tov'];
            ?>

            <header>
                <h1>Изменение товара</h1>
                <div class=line></div>
                <form action="" method="POST">
                    <input type="text" value='<?php echo $tt["item"] ?>' name="item">
                    <input type="number" value='<?php echo $tt["quantiry"] ?>' name="quantiry" min=0>
                    <input type="number" value='<?php echo $tt["price"] ?>' name=price min=0>
                    <input type="submit" value="Изменить" name=edit class=btn-edit>
                </form>
            </header>
            <?php
            include('1.php');
            ?>
        </div>
</body>

</html>