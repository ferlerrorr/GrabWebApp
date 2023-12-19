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
            <div class="toggle-body">
                <div class="can-toggle" id="${store}">
                    <input id="${store}" type="checkbox" data-store-id="${store}"  onchange="logCheckboxId(this)" ${
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
        data-toggle="modal" data-target="#GrabDeleteStoreConfirmationModal"
        data-store-id="${a.istore}">Delete
      </button>`;
  }

  a(), //! // Call the function to initialize the store table
    $("#GrabDeleteStoreConfirmationModal").on("show.bs.modal", function (a) {
      var e = $(a.relatedTarget);
      t = e.data("store-id");
      $("#GrabConfirmDeleteStore").val(t);
      console.log(t);
    }),
    $(document).on("click", "#GrabConfirmDeleteStore", function () {
      var e = $(this).attr("value");
      $("#GrabDeleteStoreConfirmationModal").modal("hide"),
        $("#GrabStoreTable").fadeOut(420, function () {
          $.fn.DataTable.isDataTable("#GrabStoreTable") &&
            $("#GrabStoreTable").DataTable().destroy(),
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
    $("#sdsds").click(function () {
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
      $("#GrabStoreTable").fadeOut(420, function () {
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

function logCheckboxId(checkbox) {
  if ($(checkbox).prop("checked")) {
    e = $(checkbox).attr("id");
    $.ajax({
      async: !0,
      crossDomain: !0,
      url:
        "http://localhost:8802/api/ssd/sftp/grab-update-store-maintenance/" + e,
      method: "GET",
      headers: { Accept: "*/*" },
    })
      .done(function (a) {
        console.log(a);
      })
      .fail(function (a) {
        console.error(a);
      });
  } else {
    e = $(checkbox).attr("id");
    $.ajax({
      async: !0,
      crossDomain: !0,
      url:
        "http://localhost:8802/api/ssd/sftp/grab-update-store-maintenance/" + e,
      method: "GET",
      headers: { Accept: "*/*" },
    })
      .done(function (a) {
        console.log(a);
      })
      .fail(function (a) {
        console.error(a);
      });
  }
}
