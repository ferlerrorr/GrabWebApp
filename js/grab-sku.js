$(document).ready(function () {
  function a() {
    $("#GrabSKUTable").DataTable({
      ajax: {
        url: "http://localhost:8802/api/ssd/sftp/all-sku-pack",
        dataSrc: "",
      },
      columns: [
        { data: "SKU_Number" },
        { data: "grab_pack" },
        { data: null, render: e },
      ],
      paging: !0,
      searching: !0,
    });
  }
  function e(a, e, t) {
    // console.log(a);
    var n;
    return `
      <button type="button" class="btn btn-primary" 
        data-toggle="modal" data-target="#GrabEditSKUModal"
        data-sku_number="${a.SKU_Number}" data-grab_pack="${a.grab_pack}">Edit
      </button>
      <button type="button" class="btn btn-danger" 
        data-toggle="modal" data-target="#GrabDeleteSKUConfirmationModal"
        data-sku_number="${a.SKU_Number}">Delete
      </button>`;
  }
  a(), //! // Call the function to initialize the vendor table
    $("#GrabSKUTable tbody").on("click", "button.btn-primary", function () {
      var a = $(this).data("sku_number"),
        e = $(this).data("grab_pack");
      $("#GrabEditSKUNumber").val(a),
        $("#GrabEditPiecetoPack").val(e),
        $("#GrabSaveEditSKUButton").val(e);
    }),
    $("#GrabSaveEditSKUButton").click(function () {
      var e = $("#GrabEditSKUNumber").val(),
        t = $("#GrabEditPiecetoPack").val(),
        n = $(this).attr("value");
      let o = {
        async: !0,
        crossDomain: !0,
        url: "http://localhost:8800/api/ssd/asn/vendorid-setup-update/" + n,
        method: "PUT",
        headers: { Accept: "*/*", "Content-Type": "application/json" },
        processData: !1,
        data: JSON.stringify({ v_vname: e, v_vid: t }),
      };
      $("#GrabEditSKUModal").modal("hide");
      $("#GrabSKUTable").fadeOut(420, function () {
        $.fn.DataTable.isDataTable("#GrabSKUTable") &&
          $("#GrabSKUTable").DataTable().destroy(),
          a(),
          $(this).fadeIn(480);
      }),
        $.ajax(o)

          .done(function (a) {
            console.log(a);
            $("#GrabEditSKUModal").modal("hide");
          })
          .fail(function (a, e, t) {
            console.error(t);
          })
          .always(function () {
            $("#GrabEditSKUModal").modal("hide");
          });
    }),
    $("#GrabDeleteSKUConfirmationModal").on("show.bs.modal", function (a) {
      var e = $(a.relatedTarget);
      e.data("sku_number");
      var t = e.data("sku_number");
      $("#GrabConfirmDeleteVendor").val(t);
    }),
    $(document).on("click", "#GrabConfirmDeleteVendor", function () {
      var e = $(this).attr("value");
      $("#GrabDeleteSKUConfirmationModal").modal("hide"),
        $("#GrabSKUTable").fadeOut(420, function () {
          $.fn.DataTable.isDataTable("#GrabSKUTable") &&
            $("#GrabSKUTable").DataTable().destroy(),
            a(),
            $(this).fadeIn(480);
        }),
        $.ajax({
          async: !0,
          crossDomain: !0,
          url: "http://localhost:8800/api/ssd/asn/vendorid-setup-delete/" + e,
          method: "GET",
          headers: { Accept: "*/*" },
        })
          .done(function (a) {
            console.log(a);
          })
          .fail(function (a) {
            console.error(a);
          });
    }),
    $("#GrabAddSKUModalButton").click(function () {
      var e = $("#GrabAddSKUNumber").val(),
        t = $("#GrabAddPiecetoPack").val();
      let n = {
        async: !0,
        crossDomain: !0,
        url: "http://localhost:8800/api/ssd/asn/vendorid-setup-create",
        method: "POST",
        headers: { Accept: "*/*", "Content-Type": "application/json" },
        processData: !1,
        data: JSON.stringify({ SKU_Number: e, pack: t }),
      };
      $("#GrabSKUTable").fadeOut(420, function () {
        $.fn.DataTable.isDataTable("#GrabSKUTable") &&
          $("#GrabSKUTable").DataTable().destroy(),
          a(),
          $(this).fadeIn(480);
      }),
        $.ajax(n).done(function (a) {
          console.log(a);
        }),
        $("#GrabAddSKUModal").modal("hide");
    });
});
