$("#leftside-navigation .parent > a").click(function (e) {
  e.preventDefault();
  var i = $("#leftside-navigation ul").not($(this).parents("ul"));
  if (
    (i.slideUp(),
    i.parent().removeClass("open"),
    !$(this).next().is(":visible"))
  ) {
    var a = $(this).next();
    a.slideDown(), a.parent().not(".open").addClass("open");
  }
  e.stopPropagation();
}),
  $("#GrabSku").click(function (e) {
    $("#toast-container").removeClass("view-visible").addClass("view-hidden"),
      $("#sftpGrab").removeClass("view-hidden").addClass("view-visible"),
      $("#sftpGrabStore").removeClass("view-visible").addClass("view-hidden");
  }),
  $("#ssd-logo").click(function (e) {
    $("#sftpGrab").removeClass("view-visible").addClass("view-hidden"),
      $("#toast-container").removeClass("view-hidden").addClass("view-visible"),
      $("#sftpGrabStore").removeClass("view-visible").addClass("view-hidden");
  }),
  $("#GrabStore").click(function (e) {
    $("#sftpGrab").removeClass("view-visible").addClass("view-hidden"),
      $("#toast-container").removeClass("view-visible").addClass("view-hidden"),
      $("#sftpGrabStore").removeClass("view-hidden").addClass("view-visible");
  });
//   $("#navExport").click(function (e) {
//     $("#colSetup").removeClass("view-visible").addClass("view-hidden"),
//       $("#errorlogs").removeClass("view-visible").addClass("view-hidden"),
//       $("#asnView").removeClass("view-visible").addClass("view-hidden"),
//       $("#asnExport").removeClass("view-hidden").addClass("view-visible"),
//       $("#duplogs").removeClass("view-visible").addClass("view-hidden"),
//       $("#asnVid").removeClass("view-visible").addClass("view-hidden");
//   }),
//   $("#navErrlogs").click(function (e) {
//     $("#colSetup").removeClass("view-visible").addClass("view-hidden"),
//       $("#asnView").removeClass("view-visible").addClass("view-hidden"),
//       $("#asnExport").removeClass("view-visible").addClass("view-hidden"),
//       $("#errorlogs").removeClass("view-hidden").addClass("view-visible"),
//       $("#duplogs").removeClass("view-visible").addClass("view-hidden"),
//       $("#asnVid").removeClass("view-visible").addClass("view-hidden");

//   }),
//   $("#navDuplogs").click(function (e) {
//     $("#colSetup").removeClass("view-visible").addClass("view-hidden"),
//       $("#asnView").removeClass("view-visible").addClass("view-hidden"),
//       $("#asnExport").removeClass("view-visible").addClass("view-hidden"),
//       $("#errorlogs").removeClass("view-visible").addClass("view-hidden"),
//       $("#asnVid").removeClass("view-visible").addClass("view-hidden"),
//       $("#duplogs").removeClass("view-hidden").addClass("view-visible");

//   }),
//   $("#navVid").click(function (e) {
//     $("#asnView").removeClass("view-visible").addClass("view-hidden"),
//       $("#colSetup").removeClass("view-visible").addClass("view-hidden"),
//       $("#asnExport").removeClass("view-visible").addClass("view-hidden"),
//       $("#errorlogs").removeClass("view-visible").addClass("view-hidden"),
//       $("#duplogs").removeClass("view-visible").addClass("view-hidden"),
//       $("#asnVid").removeClass("view-hidden").addClass("view-visible"),
//       $("#vsetupVendorTable").DataTable().destroy(),
//   }), //! // Call the function to initialize the vendor table
