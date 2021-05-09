/* SPDX-FileCopyrightText: 2021-present Kriasoft <hello@kriasoft.com> */
/* SPDX-License-Identifier: MIT */

module.exports = async function () {
  const module = await import("./app.chunk");
  console.log(module);
};
