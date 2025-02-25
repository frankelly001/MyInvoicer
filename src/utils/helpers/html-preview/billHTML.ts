import {BillType} from '../../../types/Billing';
import {Business} from '../../../types/Business';
import {CustomerData} from '../../../types/Customers';
import {Products} from '../../../types/Invoices';

export const billHTML = ({
  type,
  billDates,
  businessData,
  billNumber,
  amountDue,
  customerData,
  billTerms,
  products,
  discount,
  grandTotal,
  subTotal,
  tax,
  currency,
}: {
  type: BillType;
  billDates: {label: string; value: string}[] | undefined;
  businessData: Business | undefined;
  billNumber: string | undefined;
  products: Array<Products> | undefined;
  amountDue: string | undefined;
  customerData: CustomerData | undefined;
  billTerms: string | undefined;
  grandTotal: string | undefined;
  tax: {percentage: string; price: string} | undefined;
  discount: {percentage: string; price: string} | undefined;
  subTotal: string;
  currency: string | undefined;
}) => {
  const html = `<!DOCTYPE html>
<html
  lang="en"
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <meta charset="utf-8" />
    <meta content="width=device-width" name="viewport" />
    <meta content="IE=edge" http-equiv="X-UA-Compatible" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta
      content="telephone=no,address=no,email=no,date=no,url=no"
      name="format-detection"
    />
    <title>${type} - pdf</title>
    <link
      href="https://fonts.googleapis.com/css?family=Montserrat Alternates:700"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Inter:700"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Inter:400"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Inter:600"
      rel="stylesheet"
      type="text/css"
    />
    <!--[if mso]>
      <style>
        * {
          font-family: sans-serif !important;
        }
      </style>
    <![endif]-->
    <!--[if !mso]><!-->
    <!-- <![endif]-->
    <style>
      html {
        margin: 0 !important;
        padding: 0 !important;
      }
      * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }
      td {
        vertical-align: top;
        mso-table-lspace: 0pt !important;
        mso-table-rspace: 0pt !important;
      }
      a {
        text-decoration: none;
      }
      img {
        -ms-interpolation-mode: bicubic;
      }
      @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
        u ~ div .email-container {
          min-width: 320px !important;
        }
      }
      @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
        u ~ div .email-container {
          min-width: 375px !important;
        }
      }
      @media only screen and (min-device-width: 414px) {
        u ~ div .email-container {
          min-width: 414px !important;
        }
      }
    </style>
    <!--[if gte mso 9]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <style>
      @media only screen and (max-device-width: 599px),
        only screen and (max-width: 599px) {
        .eh {
          height: auto !important;
        }
        .desktop {
          display: none !important;
          height: 0 !important;
          margin: 0 !important;
          max-height: 0 !important;
          overflow: hidden !important;
          padding: 0 !important;
          visibility: hidden !important;
          width: 0 !important;
        }
        .mobile {
          display: block !important;
          width: auto !important;
          height: auto !important;
          float: none !important;
        }
        .email-container {
          width: 100% !important;
          margin: auto !important;
        }
        .stack-column,
        .stack-column-center {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          direction: ltr !important;
        }
        .wid-auto {
          width: auto !important;
        }

        .table-w-full-mobile {
          width: 100%;
        }

        .mobile-center {
          text-align: center;
        }

        .mobile-center > table {
          display: inline-block;
          vertical-align: inherit;
        }

        .mobile-left {
          text-align: left;
        }

        .mobile-left > table {
          display: inline-block;
          vertical-align: inherit;
        }

        .mobile-right {
          text-align: right;
        }

        .mobile-right > table {
          display: inline-block;
          vertical-align: inherit;
        }
      }
    </style>
  </head>

  <body
    width="100%"
    style="
      background-color: #f0f0f0;
      margin: 0;
      padding: 0 !important;
      mso-line-height-rule: exactly;
    "
  >
    <div style="background-color: #f0f0f0">
      <!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill type="tile" color="#f0f0f0" />
        </v:background>
      <![endif]-->
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td valign="top" align="center">
            <table
              bgcolor="#ffffff"
              style="margin: 0 auto"
              align="center"
              id="brick_container"
              cellspacing="0"
              cellpadding="0"
              border="0"
              width="600"
              class="email-container"
            >
              <tr>
                <td width="600">
                  <table cellspacing="0" cellpadding="0" border="0">
                    <tr>
                      <td
                        width="600"
                        style="background-color: #ffffff"
                        bgcolor="#ffffff"
                      >
                        <table
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                        >
                          <tr>
                            <td width="600">
                              <table cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                  <td
                                    width="552"
                                    style="
                                      height: 96px;
                                      background-color: #ffffff;
                                      padding-left: 24px;
                                      padding-right: 24px;
                                    "
                                    bgcolor="#ffffff"
                                  >
                                    <table
                                      width="100%"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                    >
                                      <tr>
                                        <td
                                          height="24"
                                          style="
                                            height: 24px;
                                            min-height: 24px;
                                            line-height: 24px;
                                          "
                                        ></td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <table
                                            cellspacing="0"
                                            cellpadding="0"
                                            border="0"
                                          >
                                            <tr>
                                              <td width="549">
                                                <table
                                                  width="100%"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                >
                                                  <tr>
                                                    <td width="317">
                                                      <table
                                                        width="100%"
                                                        border="0"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                      >
                                                        <tr>
                                                          <td>
                                                            <div
                                                              style="
                                                                line-height: 36px;
                                                                text-align: left;
                                                              "
                                                            >
                                                              <span
                                                                style="
                                                                  color: #101828;
                                                                  font-weight: 700;
                                                                  font-family: Montserrat
                                                                      Alternates,
                                                                    Arial,
                                                                    sans-serif;
                                                                  font-size: 28px;
                                                                  line-height: 36px;
                                                                  text-align: left;
                                                                  text-transform: uppercase;
                                                                "
                                                                >${type}</span
                                                              >
                                                            </div>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </td>
                                                    <!-- <td
                                                      style="
                                                        width: 113px;
                                                        min-width: 113px;
                                                        background-color: red;
                                                      "
                                                      width="113"
                                                    ></td> -->
                                                    <td width="100%">
                                                      <div
                                                        style="
                                                          line-height: 21px;
                                                          text-align: right;
                                                        "
                                                      >
                                                        <span
                                                          style="
                                                            color: #3454d1;
                                                            font-weight: 700;
                                                            font-family: Inter,
                                                              Arial, sans-serif;
                                                            font-size: 12px;
                                                            line-height: 21px;
                                                            text-align: right;
                                                          "
                                                          >${billNumber}<br /></span
                                                        >
                                                        ${billDates
                                                          ?.map(
                                                            ({
                                                              label,
                                                              value,
                                                            }) => `
                                                       
                                                        <span
                                                          style="
                                                            color: #667085;
                                                            font-family: Inter, Arial, sans-serif;
                                                            font-size: 10px;
                                                            line-height: 21px;
                                                            text-align: right;
                                                          "
                                                        >
                                                          ${label} 
                                                        </span>
                                                        <span
                                                          style="
                                                            color: #667085;
                                                            font-weight: 600;
                                                            font-family: Inter, Arial, sans-serif;
                                                            font-size: 10px;
                                                            line-height: 21px;
                                                            text-align: right;
                                                          "
                                                        >
                                                          ${value}<br />
                                                        </span>
                                                      `,
                                                          )
                                                          .join('')}
                                                       
                                                        
                                            

                                                      </div>
                                                    </td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          height="24"
                                          style="
                                            height: 24px;
                                            min-height: 24px;
                                            line-height: 24px;
                                          "
                                        ></td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td width="600">
                              <table cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                  <td
                                    width="552"
                                    style="
                                      vertical-align: middle;
                                      height: 88px;
                                      background-color: #ffffff;
                                      padding-left: 24px;
                                      padding-right: 24px;
                                    "
                                    bgcolor="#ffffff"
                                  >
                                    <table
                                      width="100%"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                    >
                                      <tr>
                                        <td
                                          height="8"
                                          style="
                                            height: 8px;
                                            min-height: 8px;
                                            line-height: 8px;
                                          "
                                        ></td>
                                      </tr>
                                      <tr>
                                        <td
                                          style="vertical-align: middle"
                                          width="185"
                                        >
                                          <div
                                            style="
                                              line-height: 20px;
                                              text-align: left;
                                            "
                                          >
                                            <span
                                              style="
                                                color: #1c1e23;
                                                font-weight: 700;
                                                font-family: Inter, Arial,
                                                  sans-serif;
                                                font-size: 12px;
                                                line-height: 20px;
                                                text-align: left;
                                              "
                                              >${
                                                businessData?.businessName
                                              }<br /></span
                                            ><span
                                              style="
                                                color: #667085;
                                                font-family: Inter, Arial,
                                                  sans-serif;
                                                font-size: 10px;
                                                line-height: 20px;
                                                text-align: left;
                                              "
                                              ><a
                                                style="
                                                  color: #667085;
                                                  text-decoration: none;
                                                "
                                                href="mailto:${
                                                  businessData?.email
                                                }"
                                                target="_blank"
                                                >${businessData?.email}</a
                                              ><br />
                                              <a
                                                style="
                                                  color: #667085;
                                                  text-decoration: none;
                                                "
                                                href="tel:${
                                                  businessData?.phone
                                                }"
                                                target="_blank"
                                                >${businessData?.phone}</a
                                              ><br />${
                                                businessData?.address
                                              }</span
                                            >
                                          </div>
                                        </td>
                                        <td> </td>
                                        <td
                                          style="vertical-align: middle"
                                          width="134"
                                        >
                                          <img
                                            src=${businessData?.logoUrl}
                                            width="134"
                                            border="0"
                                            style="
                                              min-width: 134px;
                                              width: 134px;
                                              height: auto;
                                              display: block;
                                            "
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          height="8"
                                          style="
                                            height: 8px;
                                            min-height: 8px;
                                            line-height: 8px;
                                          "
                                        ></td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td width="600">
                              <table cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                  <td
                                    width="552"
                                    style="
                                      /* height: 317px; */
                                      background-color: #ffffff;
                                      padding-left: 24px;
                                      padding-right: 24px;
                                    "
                                    bgcolor="#ffffff"
                                  >
                                    <table
                                      width="100%"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                    >
                                      <tr>
                                        <td width="100%">
                                          <table
                                            width="100%"
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                          >
                                            <tr>
                                              <td
                                                width="552"
                                                style="vertical-align: middle"
                                              >
                                                <table
                                                  width="100%"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                >
                                                  <tr>
                                                    <td
                                                      height="16"
                                                      style="
                                                        height: 16px;
                                                        min-height: 16px;
                                                        line-height: 16px;
                                                      "
                                                    ></td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      style="
                                                        vertical-align: middle;
                                                      "
                                                    >
                                                      <div
                                                        style="
                                                          line-height: 21px;
                                                        "
                                                      >
                                                        <span
                                                          style="
                                                            color: #667085;
                                                            font-family: Inter,
                                                              Arial, sans-serif;
                                                            font-size: 10px;
                                                            line-height: 21px;
                                                            text-align: center;
                                                          "
                                                          >Bill to: </span
                                                        ><span
                                                          style="
                                                            color: #1c1e23;
                                                            font-weight: 600;
                                                            font-family: Inter,
                                                              Arial, sans-serif;
                                                            font-size: 10px;
                                                            line-height: 21px;
                                                            text-align: center;
                                                          "
                                                          >${
                                                            customerData?.name
                                                          }</span
                                                        >
                                                      </div>
                                                    </td>

                                                    <td
                                                      style="
                                                        vertical-align: middle;
                                                      "
                                                    >
                                                      <div
                                                        style="
                                                          line-height: 21px;
                                                          text-align: end;
                                                        "
                                                      >
                                                        <span
                                                          style="
                                                            color: #667085;
                                                            font-family: Inter,
                                                              Arial, sans-serif;
                                                            font-size: 10px;
                                                            line-height: 21px;
                                                            text-align: center;
                                                          "
                                                          >Amount Due: </span
                                                        ><span
                                                          style="
                                                            color: #1c1e23;
                                                            font-weight: 700;
                                                            font-family: Inter,
                                                              Arial, sans-serif;
                                                            font-size: 12px;
                                                            line-height: 21px;
                                                            text-align: center;
                                                          "
                                                          >${currency}${amountDue}</span
                                                        >
                                                      </div>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      height="8"
                                                      style="
                                                        height: 8px;
                                                        min-height: 8px;
                                                        line-height: 8px;
                                                      "
                                                    ></td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                width="100%"
                                                style="
                                                  border-width: 0px 0px 1px 0px;
                                                  border-color: #e0e0e0;
                                                  border-style: solid;
                                                "
                                              >
                                                <table
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                >
                                                  <tr>
                                                    <td
                                                      height="8"
                                                      style="
                                                        height: 8px;
                                                        min-height: 8px;
                                                        line-height: 8px;
                                                      "
                                                    ></td>
                                                  </tr>
                                                  <tr>
                                                    <td width="276">
                                                      <div
                                                        style="
                                                          line-height: 24px;
                                                          text-align: left;
                                                        "
                                                      >
                                                        <span
                                                          style="
                                                            color: #1c1e23;
                                                            font-weight: 600;
                                                            font-family: Inter,
                                                              Arial, sans-serif;
                                                            font-size: 10px;
                                                            line-height: 24px;
                                                            text-align: left;
                                                          "
                                                          >Item and
                                                          Description</span
                                                        >
                                                      </div>
                                                    </td>
                                                    <td>
                                                      <table
                                                        width="100%"
                                                        border="0"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                      >
                                                        <tr>
                                                          <td width="82">
                                                            <div
                                                              style="
                                                                line-height: 24px;
                                                                text-align: right;
                                                              "
                                                            >
                                                              <span
                                                                style="
                                                                  color: #101828;
                                                                  font-weight: 600;
                                                                  font-family: Inter,
                                                                    Arial,
                                                                    sans-serif;
                                                                  font-size: 10px;
                                                                  line-height: 24px;
                                                                  text-align: right;
                                                                "
                                                                >Qty</span
                                                              >
                                                            </div>
                                                          </td>
                                                          <td
                                                            style="
                                                              width: 23px;
                                                              min-width: 23px;
                                                            "
                                                            width="23"
                                                          ></td>
                                                          <td width="82">
                                                            <div
                                                              style="
                                                                line-height: 24px;
                                                                text-align: right;
                                                              "
                                                            >
                                                              <span
                                                                style="
                                                                  color: #101828;
                                                                  font-weight: 700;
                                                                  font-family: Inter,
                                                                    Arial,
                                                                    sans-serif;
                                                                  font-size: 10px;
                                                                  line-height: 24px;
                                                                  text-align: right;
                                                                "
                                                                >Rate</span
                                                              >
                                                            </div>
                                                          </td>
                                                          <td
                                                            style="
                                                              width: 23px;
                                                              min-width: 23px;
                                                            "
                                                            width="23"
                                                          ></td>
                                                          <td width="64">
                                                            <div
                                                              style="
                                                                line-height: 24px;
                                                                text-align: right;
                                                              "
                                                            >
                                                              <span
                                                                style="
                                                                  color: #101828;
                                                                  font-weight: 700;
                                                                  font-family: Inter,
                                                                    Arial,
                                                                    sans-serif;
                                                                  font-size: 10px;
                                                                  line-height: 24px;
                                                                  text-align: right;
                                                                "
                                                                >Amount</span
                                                              >
                                                            </div>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      height="4"
                                                      style="
                                                        height: 4px;
                                                        min-height: 4px;
                                                        line-height: 4px;
                                                      "
                                                    ></td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                            <!-- each added item start -->
                                           ${products
                                             ?.map(
                                               el => `<tr>
                                              <td
                                                width="100%"
                                                align="center"
                                                style="
                                                  vertical-align: middle;
                                                  border-width: 0px 0px 1px 0px;
                                                  border-color: #e0e0e0;
                                                  border-style: solid;
                                                "
                                              >
                                                <table
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                >
                                                  <tr>
                                                    <td
                                                      height="8"
                                                      style="
                                                        height: 8px;
                                                        min-height: 8px;
                                                        line-height: 8px;
                                                      "
                                                    ></td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      style="
                                                        vertical-align: middle;
                                                      "
                                                      width="276"
                                                      align="center"
                                                    >
                                                      <div
                                                        style="
                                                          line-height: 24px;
                                                          text-align: left;
                                                        "
                                                      >
                                                        <span
                                                          style="
                                                            color: #1c1e23;
                                                            font-family: Inter,
                                                              Arial, sans-serif;
                                                            font-size: 10px;
                                                            line-height: 24px;
                                                            text-align: left;
                                                          "
                                                          >${el?.productName}<br />${el?.description}</span
                                                        >
                                                      </div>
                                                    </td>
                                                    <td
                                                      style="
                                                        vertical-align: middle;
                                                    
                                                      "
                                                    >
                                                      <table
                                                        cellspacing="0"
                                                        cellpadding="0"
                                                        border="0"
                                                      >
                                                        <tr>
                                                          <td>
                                                            <table
                                                              width="100%"
                                                              border="0"
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                            >
                                                              <tr>
                                                                <td width="82">
                                                                  <div
                                                                    style="
                                                                      line-height: 24px;
                                                                      text-align: right;
                                                                    "
                                                                  >
                                                                    <span
                                                                      style="
                                                                        color: #101828;
                                                                        font-family: Inter,
                                                                          Arial,
                                                                          sans-serif;
                                                                        font-size: 10px;
                                                                        line-height: 24px;
                                                                        text-align: right;
                                                                      "
                                                                      >${el.quantity}</span
                                                                    >
                                                                  </div>
                                                                </td>
                                                                <td
                                                                  style="
                                                                    width: 23px;
                                                                    min-width: 23px;
                                                                  "
                                                                  width="23"
                                                                ></td>
                                                                <td width="82">
                                                                  <div
                                                                    style="
                                                                      line-height: 24px;
                                                                      text-align: right;
                                                                    "
                                                                  >
                                                                    <span
                                                                      style="
                                                                        color: #101828;
                                                                        font-family: Inter,
                                                                          Arial,
                                                                          sans-serif;
                                                                        font-size: 10px;
                                                                        line-height: 24px;
                                                                        text-align: right;
                                                                      "
                                                                      >${currency}${el.price}</span
                                                                    >
                                                                  </div>
                                                                </td>
                                                                <td
                                                                  style="
                                                                    min-width: 23px;
                                                                  "
                                                                  width="23"
                                                                ></td>
                                                                <td width="64">
                                                                  <div
                                                                    style="
                                                                      line-height: 24px;
                                                                      text-align: right;
                                                                    "
                                                                  >
                                                                    <span
                                                                      style="
                                                                        color: #101828;
                                                                        font-weight: 700;
                                                                        font-family: Inter,
                                                                          Arial,
                                                                          sans-serif;
                                                                        font-size: 10px;
                                                                        line-height: 24px;
                                                                        text-align: right;
                                                                      "
                                                                      >${currency}${el.total}</span
                                                                    >
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      height="4"
                                                      style="
                                                        height: 4px;
                                                        min-height: 4px;
                                                        line-height: 4px;
                                                      "
                                                    ></td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>`,
                                             )
                                             .join('')}
                                            <!-- each added item end -->
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          height="24"
                                          style="
                                            height: 24px;
                                            min-height: 24px;
                                            line-height: 24px;
                                          "
                                        ></td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td width="600">
                              <table cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                  <td
                                    width="552"
                                    style="
                                      height: 143px;
                                      background-color: #f2f2f2;
                                      padding-left: 24px;
                                      padding-right: 24px;
                                    "
                                    bgcolor="#f2f2f2"
                                  >
                                    <table
                                      width="100%"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                    >
                                      <tr>
                                        <td width="100%" style="height: 149px">
                                          <table
                                            width="100%"
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                          >
                                            <tr>
                                              <td
                                                width="100%"
                                                align="right"
                                                style="
                                                  border-width: 0px 0px 1px 0px;
                                                  border-color: #e0e0e0;
                                                  border-style: solid;
                                                "
                                              >
                                                <table
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                >
                                                  <tr>
                                                    <td
                                                      height="8"
                                                      style="
                                                        height: 8px;
                                                        min-height: 8px;
                                                        line-height: 8px;
                                                      "
                                                    ></td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <table
                                                        width="100%"
                                                        border="0"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                      >
                                                        <tr>
                                                          <td width="82">
                                                            <div
                                                              style="
                                                                line-height: 24px;
                                                                text-align: right;
                                                              "
                                                            >
                                                              <span
                                                                style="
                                                                  color: #101828;
                                                                  font-weight: 600;
                                                                  font-family: Inter,
                                                                    Arial,
                                                                    sans-serif;
                                                                  font-size: 10px;
                                                                  line-height: 24px;
                                                                  text-align: right;
                                                                "
                                                                >Sub Total</span
                                                              >
                                                            </div>
                                                          </td>
                                                          <td
                                                            style="
                                                              width: 23px;
                                                              min-width: 23px;
                                                            "
                                                            width="23"
                                                          ></td>
                                                          <td width="64">
                                                            <div
                                                              style="
                                                                line-height: 24px;
                                                                text-align: right;
                                                              "
                                                            >
                                                              <span
                                                                style="
                                                                  color: #101828;
                                                                  font-weight: 700;
                                                                  font-family: Inter,
                                                                    Arial,
                                                                    sans-serif;
                                                                  font-size: 10px;
                                                                  line-height: 24px;
                                                                  text-align: right;
                                                                "
                                                                >${currency}${subTotal}</span
                                                              >
                                                            </div>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      height="4"
                                                      style="
                                                        height: 4px;
                                                        min-height: 4px;
                                                        line-height: 4px;
                                                      "
                                                    ></td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                width="100%"
                                                align="right"
                                                style="
                                                  border-width: 0px 0px 1px 0px;
                                                  border-color: #e0e0e0;
                                                  border-style: solid;
                                                "
                                              >
                                                <table
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                >
                                                  <tr>
                                                    <td
                                                      height="8"
                                                      style="
                                                        height: 8px;
                                                        min-height: 8px;
                                                        line-height: 8px;
                                                      "
                                                    ></td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <table
                                                        width="100%"
                                                        border="0"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                      >
                                                        <tr>
                                                          <td width="82">
                                                            <div
                                                              style="
                                                                line-height: 24px;
                                                                text-align: right;
                                                              "
                                                            >
                                                              <span
                                                                style="
                                                                  color: #101828;
                                                                  font-weight: 600;
                                                                  font-family: Inter,
                                                                    Arial,
                                                                    sans-serif;
                                                                  font-size: 10px;
                                                                  line-height: 24px;
                                                                  text-align: right;
                                                                "
                                                                >Discount
                                                                (${
                                                                  discount?.percentage
                                                                })</span
                                                              >
                                                            </div>
                                                          </td>
                                                          <td
                                                            style="
                                                              width: 23px;
                                                              min-width: 23px;
                                                            "
                                                            width="23"
                                                          ></td>
                                                          <td width="64">
                                                            <div
                                                              style="
                                                                line-height: 24px;
                                                                text-align: right;
                                                              "
                                                            >
                                                              <span
                                                                style="
                                                                  color: #23c367;
                                                                  font-weight: 700;
                                                                  font-family: Inter,
                                                                    Arial,
                                                                    sans-serif;
                                                                  font-size: 10px;
                                                                  line-height: 24px;
                                                                  text-align: right;
                                                                "
                                                                >${currency}${
    discount?.price
  }</span
                                                              >
                                                            </div>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      height="4"
                                                      style="
                                                        height: 4px;
                                                        min-height: 4px;
                                                        line-height: 4px;
                                                      "
                                                    ></td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                width="100%"
                                                align="right"
                                                style="
                                                  border-width: 0px 0px 1px 0px;
                                                  border-color: #e0e0e0;
                                                  border-style: solid;
                                                "
                                              >
                                                <table
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                >
                                                  <tr>
                                                    <td
                                                      height="8"
                                                      style="
                                                        height: 8px;
                                                        min-height: 8px;
                                                        line-height: 8px;
                                                      "
                                                    ></td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <table
                                                        width="100%"
                                                        border="0"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                      >
                                                        <tr>
                                                          <td width="82">
                                                            <div
                                                              style="
                                                                line-height: 24px;
                                                                text-align: right;
                                                              "
                                                            >
                                                              <span
                                                                style="
                                                                  color: #101828;
                                                                  font-weight: 600;
                                                                  font-family: Inter,
                                                                    Arial,
                                                                    sans-serif;
                                                                  font-size: 10px;
                                                                  line-height: 24px;
                                                                  text-align: right;
                                                                "
                                                                >Tax(${
                                                                  tax?.percentage
                                                                })</span
                                                              >
                                                            </div>
                                                          </td>
                                                          <td
                                                            style="
                                                              width: 23px;
                                                              min-width: 23px;
                                                            "
                                                            width="23"
                                                          ></td>
                                                          <td width="64">
                                                            <div
                                                              style="
                                                                line-height: 24px;
                                                                text-align: right;
                                                              "
                                                            >
                                                              <span
                                                                style="
                                                                  color: #101828;
                                                                  font-weight: 700;
                                                                  font-family: Inter,
                                                                    Arial,
                                                                    sans-serif;
                                                                  font-size: 10px;
                                                                  line-height: 24px;
                                                                  text-align: right;
                                                                "
                                                                >${currency}${
    tax?.price
  }</span>
                                                            </div>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      height="4"
                                                      style="
                                                        height: 4px;
                                                        min-height: 4px;
                                                        line-height: 4px;
                                                      "
                                                    ></td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td
                                                width="100%"
                                                align="right"
                                                style="
                                                  border-width: 0px 0px 1px 0px;
                                                  border-color: #e0e0e0;
                                                  border-style: solid;
                                                "
                                              >
                                                <table
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                >
                                                  <tr>
                                                    <td
                                                      height="8"
                                                      style="
                                                        height: 8px;
                                                        min-height: 8px;
                                                        line-height: 8px;
                                                      "
                                                    ></td>
                                                  </tr>
                                                  <tr>
                                                    <td>
                                                      <table
                                                        width="100%"
                                                        border="0"
                                                        cellpadding="0"
                                                        cellspacing="0"
                                                      >
                                                        <tr>
                                                          <td width="82">
                                                            <div
                                                              style="
                                                                line-height: 24px;
                                                                text-align: right;
                                                              "
                                                            >
                                                              <span
                                                                style="
                                                                  color: #101828;
                                                                  font-weight: 600;
                                                                  font-family: Inter,
                                                                    Arial,
                                                                    sans-serif;
                                                                  font-size: 10px;
                                                                  line-height: 24px;
                                                                  text-align: right;
                                                                "
                                                                >Grand
                                                                Total</span
                                                              >
                                                            </div>
                                                          </td>
                                                          <td
                                                            style="
                                                              width: 23px;
                                                              min-width: 23px;
                                                            "
                                                            width="23"
                                                          ></td>
                                                          <td width="64">
                                                            <div
                                                              style="
                                                                line-height: 24px;
                                                                text-align: right;
                                                              "
                                                            >
                                                              <span
                                                                style="
                                                                  color: #101828;
                                                                  font-weight: 700;
                                                                  font-family: Inter,
                                                                    Arial,
                                                                    sans-serif;
                                                                  font-size: 10px;
                                                                  line-height: 24px;
                                                                  text-align: right;
                                                                "
                                                                >${currency}${grandTotal}</span
                                                              >
                                                            </div>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                  <tr>
                                                    <td
                                                      height="4"
                                                      style="
                                                        height: 4px;
                                                        min-height: 4px;
                                                        line-height: 4px;
                                                      "
                                                    ></td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          height="8"
                                          style="
                                            height: 8px;
                                            min-height: 8px;
                                            line-height: 8px;
                                          "
                                        ></td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td width="600">
                              <table cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                  <td
                                    width="552"
                                    align="center"
                                    style="
                                      vertical-align: middle;
                                      height: 168px;
                                      background-color: #ffffff;
                                      padding-left: 24px;
                                      padding-right: 24px;
                                    "
                                    bgcolor="#ffffff"
                                  >
                                    <table
                                      width="100%"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                    >
                                      <tr>
                                        <td
                                          height="8"
                                          style="
                                            height: 8px;
                                            min-height: 8px;
                                            line-height: 8px;
                                          "
                                        ></td>
                                      </tr>
                                      <tr>
                                        <td
                                          style="vertical-align: middle"
                                          width="100%"
                                        >
                                          <table
                                            width="100%"
                                            cellspacing="0"
                                            cellpadding="0"
                                            border="0"
                                          >
                                            <tr>
                                              <td
                                                width="552"
                                                align="center"
                                                style="vertical-align: bottom"
                                              >
                                                <table
                                                  class="table-w-full-mobile"
                                                  width="100%"
                                                  border="0"
                                                  cellpadding="0"
                                                  cellspacing="0"
                                                >
                                                  <tr>
                                                    <!-- will add this class="stack-column-center" if its breaks -->
                                                    <td
                                                      style="
                                                        vertical-align: bottom;
                                                      "
                                                      align="center"
                                                    >
                                                      <table
                                                        cellspacing="0"
                                                        cellpadding="0"
                                                        border="0"
                                                        width="100%"
                                                      >
                                                        <tr>
                                                          <td
                                                            style="
                                                              height: 103px;
                                                            "
                                                          >
                                                            <table
                                                              width="100%"
                                                              border="0"
                                                              cellpadding="0"
                                                              cellspacing="0"
                                                            >
                                                              <tr>
                                                                <td
                                                                  style="
                                                                    height: 39px;
                                                                  "
                                                                  width="342"
                                                                >
                                                                  <div
                                                                    style="
                                                                      line-height: 20px;
                                                                      text-align: left;
                                                                    "
                                                                  >
                                                                    <span
                                                                      style="
                                                                        color: #1c1e23;
                                                                        font-weight: 700;
                                                                        font-family: Inter,
                                                                          Arial,
                                                                          sans-serif;
                                                                        font-size: 10px;
                                                                        line-height: 20px;
                                                                        text-align: left;
                                                                        text-transform: capitalize;
                                                                      "
                                                                      >${type}
                                                                      Terms<br /></span
                                                                    ><span
                                                                      style="
                                                                        color: #667085;
                                                                        font-family: Inter,
                                                                          Arial,
                                                                          sans-serif;
                                                                        font-size: 10px;
                                                                        line-height: 20px;
                                                                        text-align: left;
                                                                      "
                                                                      >${billTerms}</span
                                                                    >
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                              <tr>
                                                                <td
                                                                  height="32"
                                                                  style="
                                                                    height: 32px;
                                                                    min-height: 32px;
                                                                    line-height: 32px;
                                                                  "
                                                                ></td>
                                                              </tr>
                                                              <tr>
                                                                <td
                                                                  style="
                                                                    height: 19px;
                                                                  "
                                                                  width="342"
                                                                >
                                                                  <div
                                                                    style="
                                                                      line-height: 20px;
                                                                      text-align: left;
                                                                    "
                                                                  >
                                                                    <span
                                                                      style="
                                                                        color: #1c1e23;
                                                                        font-weight: 700;
                                                                        font-family: Inter,
                                                                          Arial,
                                                                          sans-serif;
                                                                        font-size: 10px;
                                                                        line-height: 20px;
                                                                        text-align: left;
                                                                      "
                                                                      >Thank you
                                                                      for your
                                                                      patronage</span
                                                                    >
                                                                  </div>
                                                                </td>
                                                              </tr>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                      </table>
                                                    </td>
                                                    <td
                                                      class="stack-column-center"
                                                      height="25"
                                                      style="
                                                        width: 25px;
                                                        min-width: 25px;
                                                        height: 25px;
                                                        min-height: 25px;
                                                      "
                                                      width="25"
                                                    >
                                                       
                                                    </td>
                                                    <!-- will  class="stack-column-center" if its breaks -->
                                                    <td
                                                      style="height: 103px"
                                                      width="185"
                                                      align="center"
                                                    >
                                                      <!-- will align right if its breaks -->
                                                      <div
                                                        style="
                                                          line-height: 20px;
                                                          text-align: right;
                                                        "
                                                      >
                                                        <span
                                                          style="
                                                            color: #1c1e23;
                                                            font-weight: 700;
                                                            font-family: Inter,
                                                              Arial, sans-serif;
                                                            font-size: 10px;
                                                            line-height: 20px;
                                                            text-align: right;
                                                          "
                                                          >Account Info<br /></span
                                                        ><span
                                                          style="
                                                            color: #667085;
                                                            font-family: Inter,
                                                              Arial, sans-serif;
                                                            font-size: 10px;
                                                            line-height: 20px;
                                                            text-align: right;
                                                          "
                                                          >${
                                                            businessData?.accNumber
                                                          }<br />${
    businessData?.accName
  }<br />${businessData?.bankName}</span
                                                        >
                                                      </div>
                                                    </td>
                                                  </tr>
                                                </table>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          height="24"
                                          style="
                                            height: 24px;
                                            min-height: 24px;
                                            line-height: 24px;
                                          "
                                        ></td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
`;

  return html;
};
