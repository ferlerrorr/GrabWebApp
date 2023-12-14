$(document).ready(function () {
  function a() {
    $("#GrabStoreTable").DataTable({
      ajax: {
        url: "http://localhost:8802/api/ssd/sftp/grab-stores",
        dataSrc: "",
      },
      columns: [
        { data: "istore" },
        {
          data: null,
          render: function (data, type, row) {
            // Assuming "grab" is the property name containing the grab value
            var grabValue = row.grab;
            var store = row.istore;

            // Set the checkbox value based on the grab value
            var isChecked = grabValue === 1;

            // Check if grabValue is null or 0, and update isChecked accordingly
            if (grabValue === null || grabValue === 0) {
              isChecked = false;
            }

            // Generate the checkbox HTML
            return `
            <div class"toggle-body">
              <div class="can-toggle">
                <input id="a-${store}" type="checkbox"  data-store-id="${store}" ${
              isChecked ? "checked" : ""
            }>
                </div>
              </div>
            `;
          },
        },
        { data: null, render: e },
      ],
      paging: true,
      searching: true,
    });
  }
  function e(a, e, t) {
    // console.log(a);
    var n;
    return `
   
      <button type="button" class="btn btn-danger" 
        data-toggle="modal" data-target="#GrabDeleteSKUConfirmationModal"
        data-store-id="${a.istore}">Delete
      </button>`;
  }

  //   <button type="button" class="btn btn-primary"
  //   data-toggle="modal" data-target="#GrabEditSKUModal"
  //   data-store-id="${a.istore}" data-grab-maintenance="${a.grab}">Edit
  // </button>

  a(), //! // Call the function to initialize the vendor table
    $("#GrabSKUTable tbody").on("click", "button.btn-primary", function () {
      var a = $(this).data("store-id"),
        e = $(this).data("grab-maintenance");
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
