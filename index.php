<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
            include('add.php');
            ?>

            <?php
           
            include('1.php');

            ?>
        </div>
        <script>
            const list = document.querySelectorAll('ul li a')

            document.querySelector()
            for (let i = 0; i < list.length; i++) {
                list[i].classList.remove('activ')
                list[i].onclick = function() {

                    this.classList.add("activ")
                }
            }
        </script>
</body>

</html>