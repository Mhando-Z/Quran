import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Paper, Typography, Collapse } from "@mui/material";
import { Grow, Slide } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Table } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import { tableCellClasses, TableCell, TableHead } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";
import QuranInfo from "./../DisplayQuran/QuranInfo";
import ScrollToTopButton from "../DisplayQuran/pageScroll";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 4,
    color: "white",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#191919",
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.common.black,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

//APIS VALUES DECLARATION
const ApiEndpoint = "http://api.alquran.cloud/v1/quran/en.asad";
const quranz = `http://api.alquran.cloud/v1/quran/quran-uthmani`;
const audioquran = `http://api.alquran.cloud/v1/quran/ar.alafasy`;

function QuranData() {
  const [Qurantext, setQurantext] = useState([]);
  const [QuranTrans, setTranslation] = useState([]);
  const [Quraninfo, setQuraninfo] = useState([]);
  const [Quraninf, setQuraninf] = useState([]);
  const [Ayahs, setAyahs] = useState([]);
  const [open, setOpen] = React.useState(true);
  const [showContent1, setShowContent1] = useState(false);
  const [showContent2, setShowContent2] = useState(true);
  const [value, setValue] = useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  ///DATA COPY LOGIC
  const QtextQtrans = [...Qurantext];

  ///LOGIC
  async function getQurantext() {
    const { data } = await axios.get(audioquran);
    const {
      data: { surahs },
    } = data;
    getTranslation();
    setQuraninfo(surahs[value]);
    setQuraninf(surahs);
    setQurantext(surahs[value].ayahs);
    setAyahs(surahs[value].ayahs.length);
  }
  //ANOTHER API PULL REQUEST
  async function getTranslation() {
    const { data } = await axios.get(ApiEndpoint);
    const {
      data: { surahs },
    } = data;
    const qtrans = surahs[value].ayahs.map((qxtext, index) => {
      const { text, page, numberInSurah } = qxtext;
      return {
        page: page,
        info: text,
        numberInSurah: numberInSurah,
      };
    });
    setTranslation(qtrans);
  }
  useEffect(() => {
    try {
      getQurantext();
    } catch (exp) {
      console.log(exp);
    }
  }, [value]);

  try {
    QuranTrans.map((info, index) => {
      return (QtextQtrans[index].trans = info.info);
    });
  } catch (exp) {
    console.log(exp);
  }

  const toggleContent = () => {
    setShowContent1(!showContent1);
    setShowContent2(!showContent2);
  };

  //SHOW PAGE AS ONE WITH NO TRANSLATIONN LOGIC
  const Groupdata = Qurantext.map((data) => {
    const { text, page } = data;
    return {
      page: page,
      text: text,
    };
  });

  const Groupeddata = Object.groupBy(Groupdata, (datagroup) => {
    return datagroup.page;
  });
  const Groupdat = Object.keys(Groupeddata).map((page) => {
    const array = [];
    Groupeddata[page].map((data) => {
      array.push(data.text);
    });
    return {
      page: page,
      text: array.join(" "),
    };
  });

  //LOGIC ENDS

  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <QuranInfo
        onChange={handleChange}
        quraninfo={Quraninfo}
        quraninf={Quraninf}
        Ayahs={Ayahs}
        val={value}
      />
      <TableContainer component={Paper}>
        <Table sx={{}}>
          <TableHead sx={{ boxShadow: 20, mb: 4 }}>
            <TableRow sx={{ backgroundColor: "black" }}>
              <Button
                size="large"
                variant="outlined"
                sx={{
                  color: "white",
                  fontSize: { xs: "1rem", md: "1.3rem" },
                  borderColor: "white",
                  mb: 3,
                }}
                onClick={toggleContent}
              >
                {showContent1 ? "Hide Translation" : "Show Translation"}
              </Button>
            </TableRow>
          </TableHead>
          {showContent1 && (
            <div>
              <TableBody>
                {QtextQtrans.map((row) => (
                  <StyledTableRow key={row.number}>
                    <StyledTableCell align="center" component="th" scope="row">
                      <Slide direction="left" timeout={700} in={true}>
                        <Typography
                          variant="h3"
                          sx={{ pl: { md: 20, xs: 1 }, pr: { md: 20, xs: 1 } }}
                          gutterBottom
                          align="right"
                        >
                          {row.text}
                        </Typography>
                      </Slide>
                      <Typography variant="body2" align="right">
                        Verse-{row.numberInSurah}
                      </Typography>
                      <Collapse in={open} timeout="auto" unmountOnExit>
                        <Slide direction="right" timeout={700} in={true}>
                          <Typography
                            variant="h5"
                            justifyContent="center"
                            align="justify"
                            sx={{
                              pl: { md: 20, xs: 0 },
                              pr: { md: 20, xs: 0 },
                            }}
                          >
                            {row.trans}
                          </Typography>
                        </Slide>
                      </Collapse>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </div>
          )}
        </Table>
        {/* GROUPED DATA */}
      </TableContainer>
      {showContent2 && (
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 100 }} aria-label="customized table">
              <TableHead position="sticky">
                <TableRow></TableRow>
              </TableHead>
              <TableBody>
                {Groupdat.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="center" component="th" scope="row">
                      <Grow in={true} timeout={1000}>
                        <Typography
                          variant="h3"
                          gutterBottom
                          sx={{
                            pl: { md: 20, xs: 1 },
                            pr: { md: 20, xs: 1 },
                            fontSize: { xs: "2.2rem", md: "3rem" },
                          }}
                          align="justify"
                        >
                          {row.text}
                        </Typography>
                      </Grow>
                      <Typography gutterBottom variant="body2" align="center">
                        Page-{row.page}
                      </Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      <ScrollToTopButton />
    </Container>
  );
}

export default QuranData;
