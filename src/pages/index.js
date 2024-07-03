import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import premiData from "@/data/premi.json";
import asuransiData from "@/data/asuransi.json";
import { useEffect, useState } from "react";
import { formatRupiah } from "@/helpers/helper";
import Head from "next/head";
import { redirect } from "next/navigation";
import { Instagram, Whatsapp } from "iconsax-react";

export default function Home() {
  const [data, setData] = useState(premiData);
  const [dataAsuransi, setDataAsuransi] = useState(asuransiData);
  const [filteredData, setFilteredData] = useState([]);
  const [umur, setUmur] = useState(null);
  const [type, setType] = useState(null);
  const [category, setCategory] = useState(null);
  const [asuransi, setAsuransi] = useState(null);
  const [umurContact, setUmurContact] = useState(null);
  const [nama, setNama] = useState(null);
  const [gender, setGender] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputUmur = new FormData(event.target).get("umur");
    const inputType = new FormData(event.target).get("type");
    setUmur(inputUmur);
    setType(inputType);
    let res = [];
    if (inputType == "premi") {
      res = data.filter(
        (item) => inputUmur >= item.min_age && inputUmur <= item.max_age
      );
    } else {
      res = dataAsuransi.filter(
        (item) => inputUmur >= item.min_age && inputUmur <= item.max_age
      );
    }
    setFilteredData(res);
    setCategory("pria");
    setAsuransi("1");
    console.log(res);
  };

  const handleSubmitContactUs = (event) => {
    event.preventDefault();
    const inputUmur = new FormData(event.target).get("umur_c");
    const inputNama = new FormData(event.target).get("nama");
    const inputGender = new FormData(event.target).get("gender");
    const message = `Gender: ${inputGender}\nNama: ${inputNama}\nUmur: ${inputUmur}\nHai, saya mau info mengenai asuransi kesehatan/jiwa MSIG Life`;
    const whatsappURL = `https://wa.me/+6281918880181?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  };

  const handleClick = (e, targetId) => {
    e.preventDefault();
    const offset = 80; // Adjust this value according to your navbar height
    const element = document.getElementById(targetId);
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  };

  const handleClickSayaMau = (data, gender, type, asuransi = '') => {
    let message = '';
    let asuransiType = '';
    if(type === 'premi') {
      message = `Hai, saya mau info mengenai asuransi kesehatan/jiwa MSIG Life plan ${
        data.plan
      } untuk ${gender} dengan umur ${umur} dan harga per bulannya sebesar ${
        gender === "pria"
        ? formatRupiah(data.male_price)
        : formatRupiah(data.female_price)
      }`;
    } else {
      if(asuransi == 1) {
        asuransiType = 'UP 100 JT';
      } else if (asuransi == 2) {
        asuransiType = 'UP 1 M';
      } else {
        asuransiType = 'UP 2.5 M';
      }
      message = `Hai, saya mau info mengenai asuransi kesehatan/jiwa MSIG Life plan ${
        data.plan
      } ${asuransiType} untuk ${gender} dengan umur ${umur}`;
    }
      const whatsappURL = `https://wa.me/+6281918880181?text=${encodeURIComponent(
        message
    )}`;
    window.open(whatsappURL, "_blank");
  };

  const SearchResult = () => {
    if (umur && type) {
      if (filteredData.length > 0) {
        if (type == "premi") {
          return (
            <>
              <div className="relative overflow-x-auto hidden md:block w-full xl:w-3/4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                    <tr className="border-y">
                      <th
                        scope="col"
                        className="px-6 py-3 text-center border-r border-l"
                      >
                        Plan
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center border-r"
                      >
                        Pria
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center border-r"
                      >
                        Wanita
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr className="bg-white border-b" key={index}>
                        <th
                          scope="row"
                          className="px-6 py-4 border-r border-l font-medium text-gray-900 whitespace-nowrap text-center w-[10%]"
                        >
                          {item.plan}
                        </th>
                        <td className="px-2 w-[45%] py-4 border-r">
                          <div className="bg-white px-6 py-4 rounded-sm">
                            <div className="font-medium text-gray-900 whitespace-nowrap italic">
                              {" "}
                              Premi/bulan: {formatRupiah(item.male_price)}
                              /bulan
                            </div>
                            <div className="font-medium text-gray-900 whitespace-nowrap italic">
                              {" "}
                              Premi/tahun: {formatRupiah(item.male_price * 10)}
                              /tahun
                            </div>
                            <div>Coverage: {item.coverage}</div>
                            <div>Class: {item.class}</div>
                            <div>Limit Tahunan: {item.limit_tahunan}</div>
                            <div>Limit Booster: {item.limit_booster}</div>
                            <div>Biaya Pendamping: {item.biaya_pendamping}</div>
                            <button
                              onClick={() => handleClickSayaMau(item, "pria", "premi")}
                              className="mt-3 px-4 py-2 gap-3 rounded-lg flex justify-center items-center bg-blue-500 hover:bg-blue-600 capitalize text-white font-semibold w-full"
                            >
                              <Whatsapp size="28" color="#FFF" /> Saya Mau Info Ini
                            </button>
                          </div>
                        </td>
                        <td className="px-2 w-[45%] py-4 border-r">
                          <div className="bg-white px-6 py-4 rounded-sm">
                            <div className="font-medium text-gray-900 whitespace-nowrap italic">
                              {" "}
                              Premi/bulan: {formatRupiah(item.female_price)}
                              /bulan
                            </div>
                            <div className="font-medium text-gray-900 whitespace-nowrap italic">
                              {" "}
                              Premi/tahun:{" "}
                              {formatRupiah(item.female_price * 10)}/tahun
                            </div>
                            <div> Coverage: {item.coverage}</div>
                            <div>Class: {item.class}</div>
                            <div>Limit Tahunan: {item.limit_tahunan}</div>
                            <div> Limit Booster: {item.limit_booster}</div>
                            <div>Biaya Pendamping: {item.biaya_pendamping}</div>
                            <button
                              onClick={() => handleClickSayaMau(item, "wanita", "premi")}
                              className="mt-3 px-4 py-2 gap-3 rounded-lg flex justify-center items-center bg-blue-500 hover:bg-blue-600 capitalize text-white font-semibold w-full"
                            >
                              <Whatsapp size="28" color="#FFF" /> Saya Mau Info Ini
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="block md:hidden">
                <ul className="flex md:hidden flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                  <li className="me-2">
                    <div
                      className={`${
                        category == "pria"
                          ? "text-white bg-blue-600"
                          : "hover:text-gray-900 hover:bg-gray-100"
                      } inline-block px-4 py-3 rounded-lg active cursor-pointer`}
                      aria-current="page"
                      onClick={() => setCategory("pria")}
                    >
                      Pria
                    </div>
                  </li>
                  <li className="me-2">
                    <div
                      className={`${
                        category == "wanita"
                          ? "text-white bg-blue-600"
                          : "hover:text-gray-900 hover:bg-gray-100"
                      } inline-block px-4 py-3 rounded-lg active cursor-pointer`}
                      onClick={() => setCategory("wanita")}
                    >
                      Wanita
                    </div>
                  </li>
                </ul>
              </div>
              <>
                <div
                  className={`${
                    category == "pria" ? "grid" : "hidden"
                  } md:hidden grid-cols-1 sm:grid-cols-2 gap-5 w-full`}
                >
                  {filteredData.map((item, index) => (
                    <div
                      className="text-left px-6 py-4 border flex flex-col gap-3"
                      key={index}
                    >
                      <div className="font-medium text-gray-900 whitespace-nowrap">
                        Plan: {item.plan}
                      </div>
                      <div className="font-medium text-gray-900 whitespace-nowrap italic">
                        Premi/bulan: {formatRupiah(item.male_price)}
                        /bulan
                      </div>
                      <div className="font-medium text-gray-900 whitespace-nowrap italic">
                        Premi/tahun: {formatRupiah(item.male_price * 10)}
                        /tahun
                      </div>
                      <div> Coverage: {item.coverage}</div>
                      <div>Class: {item.class}</div>
                      <div>Limit Tahunan: {item.limit_tahunan}</div>
                      <div> Limit Booster: {item.limit_booster}</div>
                      <div> Biaya Pendamping: {item.biaya_pendamping}</div>
                      <button
                        onClick={() => handleClickSayaMau(item, "pria", "premi")}
                        className="mt-3 px-4 py-2 gap-3 rounded-lg flex justify-center items-center bg-blue-500 hover:bg-blue-600 capitalize text-white font-semibold w-full"
                      >
                        <Whatsapp size="28" color="#FFF" /> Saya Mau Info Ini
                      </button>
                    </div>
                  ))}
                </div>
              </>
              <>
                <div
                  className={`${
                    category == "wanita" ? "grid" : "hidden"
                  } md:hidden grid-cols-1 sm:grid-cols-2 gap-5 w-full`}
                >
                  {filteredData.map((item, index) => (
                    <div
                      className="text-left px-6 py-4 border flex flex-col gap-3"
                      key={index}
                    >
                      <div className="font-medium text-gray-900 whitespace-nowrap">
                        Plan: {item.plan}
                      </div>
                      <div className="font-medium text-gray-900 whitespace-nowrap italic">
                        Premi/bulan: {formatRupiah(item.female_price)}
                        /bulan
                      </div>
                      <div className="font-medium text-gray-900 whitespace-nowrap italic">
                        Premi/tahun: {formatRupiah(item.female_price * 10)}
                        /tahun
                      </div>
                      <div> Coverage: {item.coverage}</div>
                      <div>Class: {item.class}</div>
                      <div>Limit Tahunan: {item.limit_tahunan}</div>
                      <div> Limit Booster: {item.limit_booster}</div>
                      <div> Biaya Pendamping: {item.biaya_pendamping}</div>
                      <button
                        onClick={() => handleClickSayaMau(item, "wanita", "premi")}
                        className="mt-3 px-4 py-2 gap-3 rounded-lg flex justify-center items-center bg-blue-500 hover:bg-blue-600 capitalize text-white font-semibold w-full"
                      >
                        <Whatsapp size="28" color="#FFF" /> Saya Mau Info Ini
                      </button>
                    </div>
                  ))}
                </div>
              </>
            </>
          );
        } else {
          return (
            <>
              <div className="relative overflow-x-auto hidden md:block w-full xl:w-3/4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                    <tr className="border-y">
                      <th
                        scope="col"
                        className="px-6 py-3 text-center border-r border-l"
                        rowSpan={type === "asuransi" ? 2 : undefined}
                      >
                        Plan
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center border-r"
                        colSpan={type === "asuransi" ? 3 : undefined}
                      >
                        Pria
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center border-r"
                        colSpan={type === "asuransi" ? 3 : undefined}
                      >
                        Wanita
                      </th>
                    </tr>
                    <tr>
                      <th className="px-6 py-3 text-center border-r border-l">UP 100 JT</th>
                      <th className="px-6 py-3 text-center border-r">UP 1 M</th>
                      <th className="px-6 py-3 text-center border-r">UP 2.5 M</th>
                      <th className="px-6 py-3 text-center border-r">UP 100 JT</th>
                      <th className="px-6 py-3 text-center border-r">UP 1 M</th>
                      <th className="px-6 py-3 text-center border-r">UP 2.5 M</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr className="bg-white border-b" key={index}>
                        <th
                          scope="row"
                          className="px-6 py-4 border-r border-l font-medium text-gray-900 whitespace-nowrap text-center w-[10%]"
                        >
                          {item.plan}
                        </th>
                        <td className="px-2 w-[45%] py-4 border-r">
                          <div className="bg-white px-6 py-4 rounded-sm">
                            <div className="font-medium text-gray-900 whitespace-nowrap italic">
                              {" "}
                              Premi/bulan: {formatRupiah(item.male_price_1)}
                              /bulan
                            </div>
                            <div className="font-medium text-gray-900 whitespace-nowrap italic">
                              {" "}
                              Premi/tahun:{" "}
                              {formatRupiah(item.male_price_1 * 10)}
                              /tahun
                            </div>
                            <button
                              onClick={() => handleClickSayaMau(item, "pria", "asuransi", "1")}
                              className="mt-3 px-4 py-2 gap-3 rounded-lg flex justify-center items-center bg-blue-500 hover:bg-blue-600 capitalize text-white font-semibold w-full"
                            >
                              <Whatsapp size="28" color="#FFF" /> Saya Mau Info Ini
                            </button>
                          </div>
                        </td>
                        <td className="px-2 w-[45%] py-4 border-r">
                          <div className="bg-white px-6 py-4 rounded-sm">
                            <div className="font-medium text-gray-900 whitespace-nowrap italic">
                              {" "}
                              Premi/bulan: {formatRupiah(item.male_price_2)}
                              /bulan
                            </div>
                            <div className="font-medium text-gray-900 whitespace-nowrap italic">
                              {" "}
                              Premi/tahun:{" "}
                              {formatRupiah(item.male_price_2 * 10)}
                              /tahun
                            </div>
                            <button
                              onClick={() => handleClickSayaMau(item, "pria", "asuransi", "2")}
                              className="mt-3 px-4 py-2 gap-3 rounded-lg flex justify-center items-center bg-blue-500 hover:bg-blue-600 capitalize text-white font-semibold w-full"
                            >
                              <Whatsapp size="28" color="#FFF" /> Saya Mau Info Ini
                            </button>
                          </div>
                        </td>
                        <td className="px-2 w-[45%] py-4 border-r">
                          <div className="bg-white px-6 py-4 rounded-sm">
                            <div className="font-medium text-gray-900 whitespace-nowrap italic">
                              {" "}
                              Premi/bulan: {formatRupiah(item.male_price_3)}
                              /bulan
                            </div>
                            <div className="font-medium text-gray-900 whitespace-nowrap italic">
                              {" "}
                              Premi/tahun:{" "}
                              {formatRupiah(item.male_price_3 * 10)}
                              /tahun
                            </div>
                            <button
                              onClick={() => handleClickSayaMau(item, "pria", "asuransi", "3")}
                              className="mt-3 px-4 py-2 gap-3 rounded-lg flex justify-center items-center bg-blue-500 hover:bg-blue-600 capitalize text-white font-semibold w-full"
                            >
                              <Whatsapp size="28" color="#FFF" /> Saya Mau Info Ini
                            </button>
                          </div>
                        </td>
                        <td className="px-2 w-[45%] py-4 border-r">
                          <div className="bg-white px-6 py-4 rounded-sm">
                            <div className="font-medium text-gray-900 whitespace-nowrap italic">
                              {" "}
                              Premi/bulan: {formatRupiah(item.female_price_1)}
                              /bulan
                            </div>
                            <div className="font-medium text-gray-900 whitespace-nowrap italic">
                              {" "}
                              Premi/tahun:{" "}
                              {formatRupiah(item.female_price_1 * 10)}
                              /tahun
                            </div>
                            <button
                              onClick={() => handleClickSayaMau(item, "wanita", "asuransi", "1")}
                              className="mt-3 px-4 py-2 gap-3 rounded-lg flex justify-center items-center bg-blue-500 hover:bg-blue-600 capitalize text-white font-semibold w-full"
                            >
                              <Whatsapp size="28" color="#FFF" /> Saya Mau Info Ini
                            </button>
                          </div>
                        </td>
                        <td className="px-2 w-[45%] py-4 border-r">
                          <div className="bg-white px-6 py-4 rounded-sm">
                            <div className="font-medium text-gray-900 whitespace-nowrap italic">
                              {" "}
                              Premi/bulan: {formatRupiah(item.female_price_2)}
                              /bulan
                            </div>
                            <div className="font-medium text-gray-900 whitespace-nowrap italic">
                              {" "}
                              Premi/tahun:{" "}
                              {formatRupiah(item.female_price_2 * 10)}
                              /tahun
                            </div>
                            <button
                              onClick={() => handleClickSayaMau(item, "wanita", "asuransi", "2")}
                              className="mt-3 px-4 py-2 gap-3 rounded-lg flex justify-center items-center bg-blue-500 hover:bg-blue-600 capitalize text-white font-semibold w-full"
                            >
                              <Whatsapp size="28" color="#FFF" /> Saya Mau Info Ini
                            </button>
                          </div>
                        </td>
                        <td className="px-2 w-[45%] py-4 border-r">
                          <div className="bg-white px-6 py-4 rounded-sm">
                            <div className="font-medium text-gray-900 whitespace-nowrap italic">
                              {" "}
                              Premi/bulan: {formatRupiah(item.female_price_3)}
                              /bulan
                            </div>
                            <div className="font-medium text-gray-900 whitespace-nowrap italic">
                              {" "}
                              Premi/tahun:{" "}
                              {formatRupiah(item.female_price_3 * 10)}
                              /tahun
                            </div>
                            <button
                              onClick={() => handleClickSayaMau(item, "wanita", "asuransi", "3")}
                              className="mt-3 px-4 py-2 gap-3 rounded-lg flex justify-center items-center bg-blue-500 hover:bg-blue-600 capitalize text-white font-semibold w-full"
                            >
                              <Whatsapp size="28" color="#FFF" /> Saya Mau Info Ini
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="md:hidden flex flex-col gap-2 items-center">
                <ul className="flex md:hidden flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                  <li className="me-2">
                    <div
                      className={`${
                        category == "pria"
                          ? "text-white bg-blue-600"
                          : "hover:text-gray-900 hover:bg-gray-100"
                      } inline-block px-4 py-3 rounded-lg active cursor-pointer`}
                      aria-current="page"
                      onClick={() => setCategory("pria")}
                    >
                      Pria
                    </div>
                  </li>
                  <li className="me-2">
                    <div
                      className={`${
                        category == "wanita"
                          ? "text-white bg-blue-600"
                          : "hover:text-gray-900 hover:bg-gray-100"
                      } inline-block px-4 py-3 rounded-lg active cursor-pointer`}
                      onClick={() => setCategory("wanita")}
                    >
                      Wanita
                    </div>
                  </li>
                </ul>
                <ul className="flex md:hidden flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                  <li className="me-2">
                    <div
                      className={`${
                        asuransi == "1"
                          ? "text-white bg-blue-600"
                          : "hover:text-gray-900 hover:bg-gray-100"
                      } inline-block px-4 py-3 rounded-lg active cursor-pointer`}
                      aria-current="page"
                      onClick={() => setAsuransi("1")}
                    >
                      UP 100 JT
                    </div>
                  </li>
                  
                  <li className="me-2">
                    <div
                      className={`${
                        asuransi == "2"
                          ? "text-white bg-blue-600"
                          : "hover:text-gray-900 hover:bg-gray-100"
                      } inline-block px-4 py-3 rounded-lg active cursor-pointer`}
                      onClick={() => setAsuransi("2")}
                    >
                      UP 1 M
                    </div>
                  </li>
                  
                  <li className="me-2">
                    <div
                      className={`${
                        asuransi == "3"
                          ? "text-white bg-blue-600"
                          : "hover:text-gray-900 hover:bg-gray-100"
                      } inline-block px-4 py-3 rounded-lg active cursor-pointer`}
                      onClick={() => setAsuransi("3")}
                    >
                      UP 2.5 M
                    </div>
                  </li>
                </ul>
              </div>
              <>
                <div
                  className={`${
                    category == "pria" ? "grid" : "hidden"
                  } md:hidden grid-cols-1 sm:grid-cols-2 gap-5 w-full`}
                >
                  {filteredData.map((item, index) => (
                    <div
                      className="text-left px-6 py-4 border flex flex-col gap-3"
                      key={index}
                    >
                      <div className="font-medium text-gray-900 whitespace-nowrap">
                        Plan: {item.plan}
                      </div>
                      <div className="font-medium text-gray-900 whitespace-nowrap italic">
                        Premi/bulan: {formatRupiah(item[`male_price_${asuransi}`])}
                        /bulan
                      </div>
                      <div className="font-medium text-gray-900 whitespace-nowrap italic">
                        Premi/tahun: {formatRupiah(item[`male_price_${asuransi}`] * 10)}
                        /tahun
                      </div>
                      <button
                        onClick={() => handleClickSayaMau(item, "pria", "asuransi", asuransi)}
                        className="mt-3 px-4 py-2 gap-3 rounded-lg flex justify-center items-center bg-blue-500 hover:bg-blue-600 capitalize text-white font-semibold w-full"
                      >
                        <Whatsapp size="28" color="#FFF" /> Saya Mau Info Ini
                      </button>
                    </div>
                  ))}
                </div>
              </>
              <>
                <div
                  className={`${
                    category == "wanita" ? "grid" : "hidden"
                  } md:hidden grid-cols-1 sm:grid-cols-2 gap-5 w-full`}
                >
                  {filteredData.map((item, index) => (
                    <div
                      className="text-left px-6 py-4 border flex flex-col gap-3"
                      key={index}
                    >
                      <div className="font-medium text-gray-900 whitespace-nowrap">
                        Plan: {item.plan}
                      </div>
                      <div className="font-medium text-gray-900 whitespace-nowrap italic">
                        Premi/bulan: {formatRupiah(item[`female_price_${asuransi}`])}
                        /bulan
                      </div>
                      <div className="font-medium text-gray-900 whitespace-nowrap italic">
                        Premi/tahun: {formatRupiah(item[`female_price_${asuransi}`] * 10)}
                        /tahun
                      </div>
                      <button
                        onClick={() => handleClickSayaMau(item, "wanita", "asuransi", asuransi)}
                        className="mt-3 px-4 py-2 gap-3 rounded-lg flex justify-center items-center bg-blue-500 hover:bg-blue-600 capitalize text-white font-semibold w-full"
                      >
                        <Whatsapp size="28" color="#FFF" /> Saya Mau Info Ini
                      </button>
                    </div>
                  ))}
                </div>
              </>
            </>
          );
        }
      } else {
        return <>Data tidak ditemukan</>;
      }
    }
  };
  return (
    <>
      <Head>
        <title>Cek Premi Asuransi Kesehatan</title>
        <meta name="description" content="Premi" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="keywords" content="premi" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar handleClick={handleClick} />
      <main className="">
        <section id="cek-premi">
          {/* <div className="relative flex bg-[url('/images/banner.jpg')] bg-cover  bg-left h-[550px]"
            style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.6)), url("/images/banner.jpg")', }}
          >
            <div className="container flex justify-center mx-auto px-5 xl:px-32 py-20">
              <div className="w-full  md:w-[80%] lg:w-[56%]">
                <div>
                  <div className="text-4xl lg:text-5xl font-bold mb-8 text-white">
                    Selamat datang di AsuransiMurah.id
                  </div>
                  <p className="text-white mb-4">
                    Saya, Ascor, sebagai agen MSIG Life, siap membantu Anda
                    dalam menjelajahi beragam produk asuransi yang transparan
                    dan sesuai dengan kebutuhan Anda.
                  </p>
                  <p className="text-white mb-4">
                    Di AsuransiMurah.id, kami tidak hanya menyediakan fitur cek
                    premi asuransi secara langsung untuk membandingkan
                    produk-produk MSIG Life, tetapi juga menawarkan bantuan dan
                    konsultasi personal dari tim profesional berpengalaman di
                    industri asuransi. Tujuan kami adalah menjadi mitra
                    terpercaya dalam perencanaan keuangan dan perlindungan masa
                    depan Anda.
                  </p>

                  <div className="flex gap-5">
                    <button
                      onClick={(e) => handleClick(e, "contact-us")}
                      className="bg-blue-700 hover:bg-blue-600 text-white font-semibold text-lg px-5 py-2 rounded-lg"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className="container mx-auto px-5 xl:px-32 cek-premi py-10 flex flex-col gap-8 items-center justify-center">
            <h1 className="text-center font-semibold text-2xl">
              Cek Premi Asuransi Kesehatan Anda Dan Keluarga
            </h1>
            <div className="flex justify-center">
              <img
                width={200}
                height={200}
                className="lg:w-[300px]"
                src="/images/logo.jpg"
                alt=""
              />
            </div>
            <p className="text-sm text-gray-500 text-center">
              Asuransi Kesehatan dengan premi lebih Hemat dengan perlindungan
              Maksimal.
            </p>
            <form
              className="w-1/2 flex flex-col gap-6"
              onSubmit={(event) => handleSubmit(event)}
            >
              <select
                id="type"
                name="type"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="premi">Asuransi Kesehatan</option>
                <option value="asuransi">Asuransi Jiwa</option>
              </select>
              <div className="relative w-full">
                <input
                  type="text"
                  id="umur"
                  name="umur"
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 border bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onc
                  required
                />
                <label
                  htmlFor="umur"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                >
                  Masukkan umur Anda
                </label>
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 capitalize text-white font-semibold w-full"
              >
                Cek Premi
              </button>
            </form>

           <SearchResult/>
          </div>
        </section>
        <section className="bg-blue-600 text-white about-us" id="about-us">
          <div className="container mx-auto px-5 xl:px-32 py-10 flex flex-col gap-8">
            <div className="about-us" id="about-us">
              <h2 className="text-2xl font-semibold">About Us</h2>
              <div className="h-1 my-5 bg-white rounded-md w-[50px]"></div>
              <div className="content">
                <div className="flex flex-col gap-5">
                  {/* <h5 className="text-lg font-semibold">
                    SEKILAS TENTANG MSIG LIFE
                  </h5> */}

                  <p className="leading-6">
                    PT MSIG Life Insurance Indonesia Tbk (juga dikenal sebagai
                    MSIG Life) telah meramaikan industri asuransi jiwa nasional
                    sejak 14 April 1985. Berdiri sebagai PT Asuransi Jiwa
                    Purnamala Internasional Indonesia (PII) lalu menjalani dua
                    kali proses transformasi, MSIG Life hadir sebagai perusahaan
                    joint venture antara PT Sinar Mas Multiartha Tbk dan grup
                    asuransi raksasa Jepang, Mitsui Sumitomo Insurance Co., Ltd.
                    pada tahun 2011.
                  </p>

                  <p className="leading-6">
                    MSIG Life resmi menjadi perusahaan terbuka pada 28 Juni 2019
                    dengan nama PT Asuransi Jiwa Sinarmas MSIG Tbk. Pada tanggal
                    9 Juli 2019, saham MSIG Life (kode saham: LIFE) mulai
                    melantai di Bursa Efek Indonesia. Bersamaan dengan itu,
                    Mitsui Sumitomo Insurance Co., Ltd. (MSI) resmi menjadi
                    pemegang saham utama dengan komposisi kepemilikan saham
                    Mitsui Sumitomo Insurance Co., Ltd. (80%), PT Sinar Mas
                    Multiartha Tbk (12,5%) dan publik (7,5%).
                  </p>

                  <p className="leading-6">
                    Mitsui Sumitomo Insurance Co., Ltd. merupakan anak
                    perusahaan MS&AD Insurance Group Holdings, Inc. MS&AD
                    memegang pangsa terbesar premi asuransi umum di Jepang dan
                    tercatat dalam 10 besar bisnis grup asuransi di dunia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="container mx-auto px-5 xl:px-32 py-10 contact-us"
          id="contact-us"
        >
          <div className="contact-us" id="contact-us">
            <h2 className="text-2xl font-semibold">Contact Us</h2>
            <div className="h-1 mt-5 bg-slate-800 rounded-md w-[50px]"></div>
            <div className="content flex flex-col sm:grid grid-cols-2 gap-5">
              <form
                className="flex flex-col gap-5 pt-7"
                onSubmit={handleSubmitContactUs}
              >
                <p className="">
                  Jangan ragu untuk menghubungi saya, Ascor, atau tim kami di
                  AsuransiMurah.id untuk informasi lebih lanjut atau konsultasi
                  gratis. Kami siap membantu Anda melangkah menuju masa depan
                  yang lebih terjamin.
                </p>
                <select
                  id="gender"
                  name="gender"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected>Gender</option>
                  <option value="Pria">Pria</option>
                  <option value="Wanita">Wanita</option>
                </select>
                <div className="relative w-full">
                  <input
                    type="text"
                    id="nama"
                    name="nama"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 border bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="nama"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Nama
                  </label>
                </div>
                <div className="relative w-full">
                  <input
                    type="text"
                    id="umur_c"
                    name="umur_c"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 border bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="umur_c"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                  >
                    Umur
                  </label>
                </div>
                <div className="btn-group flex gap-5">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 capitalize text-white font-semibold w-full"
                  >
                    <Whatsapp size="28" color="#FFF" />
                    Contact Us
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      window.open("https://instagram.com/ascor.msiglife")
                    }
                    className="px-4 py-2 rounded-lg flex items-center justify-center gap-3 bg-ig-gradient text-white font-semibold w-full"
                  >
                    <Instagram className="text-[0.75rem]" color="#FFF" />
                    Follow Us
                  </button>
                </div>
              </form>
              <div className="flex justify-center items-center">
                <img src="/images/help.svg" alt="" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
