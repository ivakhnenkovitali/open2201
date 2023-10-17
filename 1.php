<?php
if ($_POST['delete']) {
    echo '++++';
}

$rez = $db->query('SELECT `id_tov`, `item`, `quantiry`, `price`, `done` FROM `tovar`');
echo "<form method=post>
<table><thead>
    <tr>
        <th>№п/п</th>
        <th>Статус</th>
        <th>Товар</th>
        <th>Цена</th>
        <th>Кол-во</th>
        <th>Стоимость (руб)</th>
        <th>Действия</th>
    </tr></thead><tbody>";
$n = 1;

while ($td = $rez->fetch_assoc()) {
    echo '<tr>
    <td>' . $n++  . '</td>
    <td><input type=checkbox name="" value="' . $td['done'] . '"></td>
    <td>' . $td['item'] . '</td>
    <td>' . $td['quantiry'] . '</td>
    <td>' . $td['price'] . '</td>
     <td>' . $td['price'] * $td['quantiry'] . '</td>
    <td><div ><a href="edit.php?id_tov=' . $td['id_tov'] . '" class=edit><img src=icons/edit.png></a></div>
    
    
    <button class=del type=submit name=delete><div class=krest></div></button></td>
</tr>';
}
$stoim = $db->query('SELECT SUM(price*quantiry) FROM `tovar`;');
//echo $stoim;
echo '<tfoot><tr><td colspan=5>Итого</td>
<td >' . $n . '</td><td></td></tr></tfoot>';
echo "</tbody></table></form>  ";
