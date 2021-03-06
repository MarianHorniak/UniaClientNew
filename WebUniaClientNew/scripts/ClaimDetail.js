﻿var ClaimDetail = function () {

    this.index = 4;
    this.initialize = function () {
        this.el = $('<div/>');
    };

    this.render = function() {
        var self = this;
        this.el.html(ClaimDetail.template());
        $("#claimback").click(function () { app.route("detail"); });
        $("#claimDetailSave").click(function () { self.sendClaim(); });
        return this;
    };

    this.onShow = function () {
        this.loadData();
    };

    this.loadData = function () {
        this.order = Service.orders.Current;
        $("#claimDetailForm").html(ClaimDetail.detailTemplate(this.order));
    };

    this.sendClaim = function () {
        this.order = Service.orders.Current;
        var self = this;
        var d = $("#claimDetailForm").serializeArray(), data = {};
        $.each(d, function (i, v) { data[v.name] = v.value; });
        data.GUID_TransporterOrder = this.order.GUID;
        data.UserPhone = this.order.CustomerPhone;
        data.Status = "New";
        Service.sendclaim(data, function () { app.home(); });
    }

    this.initialize();
}

ClaimDetail.template = Handlebars.compile($("#claimdetail-tpl").html());
ClaimDetail.detailTemplate = Handlebars.compile($("#claimdetailForm-tpl").html());

