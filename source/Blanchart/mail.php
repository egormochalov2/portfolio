<?php
$fio = $_POST['name'];
$tel = $_POST['tel'];
$fio = htmlspecialchars($fio);
$tel = htmlspecialchars($tel);
$fio = urldecode($fio);
$tel = urldecode($tel);
$fio = trim($fio);
$tel = trim($tel);
echo $fio;
//echo "<br>";
echo $tel;
if (mail("egor18mochalov@yandex.ru", "Заявка с сайта", "ФИО:".$fio.". E-mail: ".$tel ,"From: egor18mochalov@yandex.ru \r\n"))
 {     echo "сообщение успешно отправлено";
} else {
    echo "при отправке сообщения возникли ошибки";
}?>
