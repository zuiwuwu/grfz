@{    
    Layout = null;
    List<SelectListItem> list = (List<SelectListItem>)ViewData["Params"];
    
}
<!DOCTYPE html>
<html>
<head>
    <title>@ViewBag.Title</title>
    <link rel="stylesheet" type="text/css" href="@Url.Content("~/Extjs/ext/resources/css/ext-all.css")" />
    <script type="text/javascript" src="@Url.Content("~/Extjs/ext/bootstrap.js")"></script>
</head>
<script type="text/javascript">
    Ext.onReady(function () {
        Ext.data.JsonP.request({
            url: '@ViewData["url"]Transfer/getip?token=@ViewData["TRANSFERTOKEN"]',
            callback: function (success, result) {
                if (success) {
                    if (result.success) {
                        window.location = '@Url.Action("Index")';
                    }
                    else {
                        showinfo.innerHTML = '获取IP失败';
                    }
                }
                else {
                    showinfo.innerHTML = '获取IP失败';
                }
            }
        });
    });
</script>
<body class="x-unselectable">
<div id="showinfo">正在跳转</div>
</body>
</html>
