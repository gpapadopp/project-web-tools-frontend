import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import EvaluationDone from '../../components/dialogs/evaluation-done';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import EvaluationSubmit from '../../components/dialogs/evaluation-submit';
import EvaluationError from '../../components/dialogs/evaluation-error';

function EvaluationSinglePage({token}){
  const [allEvaluationObj, setAllEvaluationObj] = useState([])
  const [renderLayout, setRenderLayout] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)

  const [tokenHasEvaluation, setTokenHasEvaluation] = useState(false)

  const [firstQuestion, setFirstQuestion] = useState("")
  const [secondQuestion, setSecondQuestion] = useState("")
  const [thirdQuestion, setThirdQuestion] = useState("")
  const [fourthQuestion, setFourthQuestion] = useState("")
  const [fifthQuestion, setFifthQuestion] = useState("")
  const [sixthQuestion, setSixthQuestion] = useState("")
  const [seventhQuestion, setSeventhQuestion] = useState("")
  const [eigthQuestion, setEigthQuestion] = useState("")

  const [ninthQuestion, setNinthQuestion] = useState("")
  const [tenthQuestion, setTenthQuestion] = useState("")

  const [question11, setQuestion11] = useState("")
  const [question12, setQuestion12] = useState("")
  const [question13, setQuestion13] = useState("")

  const [question14, setQuestion14] = useState("")
  const [question15, setQuestion15] = useState("")
  const [question16, setQuestion16] = useState("")
  const [question17, setQuestion17] = useState("")

  const [question18, setQuestion18] = useState("")
  const [question19, setQuestion19] = useState("")
  const [question20, setQuestion20] = useState("")

  const [question21, setQuestion21] = useState("")
  const [question22, setQuestion22] = useState("")
  const [question23, setQuestion23] = useState("")

  const [question24, setQuestion24] = useState("")
  const [question25, setQuestion25] = useState("")
  const [question26, setQuestion26] = useState("")
  const [question27, setQuestion27] = useState("")
  const [question28, setQuestion28] = useState("")
  const [question29, setQuestion29] = useState("")
  const [question30, setQuestion30] = useState("")
  const [question31, setQuestion31] = useState("")

  const [question32, setQuestion32] = useState("")
  const [question33, setQuestion33] = useState("")
  const [question34, setQuestion34] = useState("")
  const [question35, setQuestion35] = useState("")
  const [question36, setQuestion36] = useState("")

  const [evaluationSaved, setEvaluationSaved] = useState(false)
  const [evaluationError, setEvaluationError] = useState(false)

  const [cookies, setCookie, removeCookie] = useCookies(['user_token']);
  const router = useRouter()

  function getEvaluation(evaluationToken){
    let axios = require('axios');
    let config = {
      method: 'get',
      url: '/api/evaluations/getByToken/' + evaluationToken,
      headers: {
        'Authorization': 'Bearer ' + cookies.user_token
      }
    };

    axios(config)
      .then(function (response) {
        const allResponse = response.data
        console.log(allResponse);
        setAllEvaluationObj(allResponse['updated_evaluation'])
        if (allResponse['updated_evaluation']['is_done']){
          setTokenHasEvaluation(true)
          return;
        }
        setRenderLayout(true)
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof token !== 'undefined'){
      if (firstLoad) {
        getEvaluation(token)
        setFirstLoad(false)
      }
    }
  })

  function submitAnswers(){
    //Submit All Answers
    submitSingleAnswer("q1", firstQuestion)
    submitSingleAnswer("q2", secondQuestion)
    submitSingleAnswer("q3", thirdQuestion)
    submitSingleAnswer("q4", fourthQuestion)
    submitSingleAnswer("q5", fifthQuestion)
    submitSingleAnswer("q6", sixthQuestion)
    submitSingleAnswer("q7", seventhQuestion)
    submitSingleAnswer("q8", eigthQuestion)
    submitSingleAnswer("q9", ninthQuestion)
    submitSingleAnswer("q10", tenthQuestion)
    submitSingleAnswer("q11", question11)
    submitSingleAnswer("q12", question12)
    submitSingleAnswer("q13", question13)
    submitSingleAnswer("q14", question14)
    submitSingleAnswer("q15", question15)
    submitSingleAnswer("q16", question16)
    submitSingleAnswer("q17", question17)
    submitSingleAnswer("q18", question18)
    submitSingleAnswer("q19", question19)
    submitSingleAnswer("q20", question20)
    submitSingleAnswer("q21", question21)
    submitSingleAnswer("q22", question22)
    submitSingleAnswer("q23", question23)
    submitSingleAnswer("q24", question24)
    submitSingleAnswer("q25", question25)
    submitSingleAnswer("q26", question26)
    submitSingleAnswer("q27", question27)
    submitSingleAnswer("q28", question28)
    submitSingleAnswer("q29", question29)
    submitSingleAnswer("q30", question30)
    submitSingleAnswer("q31", question31)

    const axios = require('axios');
    const qs = require('qs');
    let data = qs.stringify({
      'id': allEvaluationObj['id']
    });
    let config = {
      method: 'post',
      url: '/api/evaluations/finish',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + cookies.user_token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };

    axios(config)
      .then(function (response) {
        const allResponse = response.data
        setEvaluationSaved(true)
      })
      .catch(function (error) {
        console.log(error);
        setEvaluationError(true)
      });

  }

  function submitSingleAnswer(answerName, answerValue){
    const axios = require('axios');
    const qs = require('qs');
    let data = qs.stringify({
      'evaluation_id': allEvaluationObj['id'],
      'meta_key': answerName,
      'meta_value': answerValue
    });
    let config = {
      method: 'post',
      url: '/api/evaluations-meta/add',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + cookies.user_token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data : data
    };

    axios(config)
      .then(function (response) {
        const allResponse = response.data
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  return (
    <>
      {renderLayout &&
        <>
          <br/>
          <h2 style={{fontWeight: "normal", textAlign: "center"}}>Αξιολόγηση Μαθήματος: <b>{allEvaluationObj['course']['name']}</b></h2>
          <span style={{fontWeight: "normal", textAlign: "center"}}>{allEvaluationObj['course']['course_type']['name']}</span>
          <span style={{fontWeight: "normal", textAlign: "center"}}>Διδάσκων: {allEvaluationObj['course']['user']['first_name']} {allEvaluationObj['course']['user']['last_name']}</span>
          <br/>
          <br/>
          <br/>
          <h1 style={{textAlign: 'center'}}>Μάθημα</h1>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Είναι ο σκοπός του μαθήματος σαφές;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Είναι ο σκοπός του μαθήματος σαφές;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={firstQuestion}
                  label="Είναι ο σκοπός του μαθήματος σαφές;"
                  onChange={(e) => setFirstQuestion(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Η ύλη που καλύφθηκε ανταποκρίνεται στους στόχους του μαθήματος;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Η ύλη που καλύφθηκε ανταποκρίνεται στους στόχους του μαθήματος;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={secondQuestion}
                  label="Η ύλη που καλύφθηκε ανταποκρίνεται στους στόχους του μαθήματος;"
                  onChange={(e) => setSecondQuestion(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Η ύλη είναι καλά οργανωμένη;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Η ύλη είναι καλά οργανωμένη;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={thirdQuestion}
                  label="Η ύλη είναι καλά οργανωμένη;"
                  onChange={(e) => setThirdQuestion(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Το εκπαιδευτικό υλικό (κύριο βιβλίο, διαφάνειες, σημειώσεις, κτλ) βοηθάει στη κατανόηση του μαθήματος;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Το εκπαιδευτικό υλικό (κύριο βιβλίο, διαφάνειες, σημειώσεις, κτλ) βοηθάει στη κατανόηση του μαθήματος;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={fourthQuestion}
                  label="Το εκπαιδευτικό υλικό (κύριο βιβλίο, διαφάνειες, σημειώσεις, κτλ) βοηθάει στη κατανόηση του μαθήματος;"
                  onChange={(e) => setFourthQuestion(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Στο μάθημα γίνεται αναφορά στην ύλη άλλων μαθημάτων;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Στο μάθημα γίνεται αναφορά στην ύλη άλλων μαθημάτων;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={fifthQuestion}
                  label="Στο μάθημα γίνεται αναφορά στην ύλη άλλων μαθημάτων;"
                  onChange={(e) => setFifthQuestion(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Στο μάθημα γίνεται σύνδεση γνώσεων με άλλα μαθήματα;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Στο μάθημα γίνεται σύνδεση γνώσεων με άλλα μαθήματα;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sixthQuestion}
                  label="Στο μάθημα γίνεται σύνδεση γνώσεων με άλλα μαθήματα;"
                  onChange={(e) => setSixthQuestion(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Το επίπεδο δυσκολίας του μαθήματος είναι ανάλογο του έτους του;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Το επίπεδο δυσκολίας του μαθήματος είναι ανάλογο του έτους του;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={seventhQuestion}
                  label="Το επίπεδο δυσκολίας του μαθήματος είναι ανάλογο του έτους του;"
                  onChange={(e) => setSeventhQuestion(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Ο αριθμός των Διδακτικών Μονάδων του μαθήματος είναι ανάλογες με το φόρτο εργασίας;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Ο αριθμός των Διδακτικών Μονάδων του μαθήματος είναι ανάλογες με το φόρτο εργασίας;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={eigthQuestion}
                  label="Ο αριθμός των Διδακτικών Μονάδων του μαθήματος είναι ανάλογες με το φόρτο εργασίας;"
                  onChange={(e) => setEigthQuestion(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <br/>
          <h1 style={{textAlign: 'center'}}>Φροντιστηριακά Μαθήματα</h1>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Τα φροντιστηριακά μαθήματα βοηθούν στη κατανόηση του μαθήματος;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Τα φροντιστηριακά μαθήματα βοηθούν στη κατανόηση του μαθήματος;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={ninthQuestion}
                  label="Τα φροντιστηριακά μαθήματα βοηθούν στη κατανόηση του μαθήματος;"
                  onChange={(e) => setNinthQuestion(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Τα φροντιστηριακά μαθήματα ενισχύουν την επίδοση μου;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Τα φροντιστηριακά μαθήματα ενισχύουν την επίδοση μου;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={tenthQuestion}
                  label="Τα φροντιστηριακά μαθήματα ενισχύουν την επίδοση μου;"
                  onChange={(e) => setTenthQuestion(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <br/>
          <h1 style={{textAlign: 'center'}}>Ασκήσεις Πράξεις</h1>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Οι Ασκήσεις-Πράξεις βοηθούν στην κατανόηση του μαθήματος;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Οι Ασκήσεις-Πράξεις βοηθούν στην κατανόηση του μαθήματος;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={question11}
                  label="Οι Ασκήσεις-Πράξεις βοηθούν στην κατανόηση του μαθήματος;"
                  onChange={(e) => setQuestion11(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Οι ασκήσεις-Πράξεις προσφέρουν εφαρμοσμένη γνώση;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Οι ασκήσεις-Πράξεις προσφέρουν εφαρμοσμένη γνώση;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={question12}
                  label="Οι ασκήσεις-Πράξεις προσφέρουν εφαρμοσμένη γνώση;"
                  onChange={(e) => setQuestion12(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Οι Ασκήσεις-Πράξεις του μαθήματος ανταποκρίνονται στους στόχους του μαθήματος;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Οι Ασκήσεις-Πράξεις του μαθήματος ανταποκρίνονται στους στόχους του μαθήματος;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={question13}
                  label="Οι ασκήσεις-Πράξεις προσφέρουν εφαρμοσμένη γνώση;"
                  onChange={(e) => setQuestion13(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <br/>
          <h1 style={{textAlign: 'center'}}>Εργασίες</h1>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Το θέμα της εργασίας δόθηκε έγκαιρα;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Το θέμα της εργασίας δόθηκε έγκαιρα;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={question14}
                  label="Το θέμα της εργασίας δόθηκε έγκαιρα;"
                  onChange={(e) => setQuestion14(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Καθορίστηκαν εκ των προτέρων τα κριτήρια βαθμολόγησης της εργασίας;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Καθορίστηκαν εκ των προτέρων τα κριτήρια βαθμολόγησης της εργασίας;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={question15}
                  label="Καθορίστηκαν εκ των προτέρων τα κριτήρια βαθμολόγησης της εργασίας;"
                  onChange={(e) => setQuestion15(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Υπήρξε καθοδήγηση από τον διδάσκοντα αναφορικά με την εργασία;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Υπήρξε καθοδήγηση από τον διδάσκοντα αναφορικά με την εργασία;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={question16}
                  label="Υπήρξε καθοδήγηση από τον διδάσκοντα αναφορικά με την εργασία;"
                  onChange={(e) => setQuestion16(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Η εργασία βοήθησε στην καλύτερη κατανόηση του μαθήματος;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Η εργασία βοήθησε στην καλύτερη κατανόηση του μαθήματος</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={question17}
                  label="Η εργασία βοήθησε στην καλύτερη κατανόηση του μαθήματος;"
                  onChange={(e) => setQuestion17(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <br/>
          <h1 style={{textAlign: 'center'}}>Εξέταση Μαθήματος</h1>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Υπάρχει διαφάνεια στα κριτήρια βαθμολόγησης;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Υπάρχει διαφάνεια στα κριτήρια βαθμολόγησης;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={question18}
                  label="Υπάρχει διαφάνεια στα κριτήρια βαθμολόγησης;"
                  onChange={(e) => setQuestion18(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Η εξέταση ήταν σχετική με το περιεχόμενο των διαλέξεων;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Η εξέταση ήταν σχετική με το περιεχόμενο των διαλέξεων;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={question19}
                  label="Η εξέταση ήταν σχετική με το περιεχόμενο των διαλέξεων;"
                  onChange={(e) => setQuestion19(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Η εξέταση έγινε με τρόπο αξιοκρατικό;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Η εξέταση έγινε με τρόπο αξιοκρατικό;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={question20}
                  label="Η εξέταση έγινε με τρόπο αξιοκρατικό;"
                  onChange={(e) => setQuestion20(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <br/>
          <h1 style={{textAlign: 'center'}}>Εκπαιδευτικές Υποδομές</h1>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Οι υποδομές των αιθουσών διδασκαλίας είναι επαρκείς σε σχέση με τον αριθμό των φοιτητών που τις χρησιμοποιούν;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Οι υποδομές των αιθουσών διδασκαλίας είναι επαρκείς σε σχέση με τον αριθμό των φοιτητών που τις χρησιμοποιούν;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={question21}
                  label="Οι υποδομές των αιθουσών διδασκαλίας είναι επαρκείς σε σχέση με τον αριθμό των φοιτητών που τις χρησιμοποιούν;"
                  onChange={(e) => setQuestion21(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Η ηλεκτρονική υποστήριξη του μαθήματος (e-class, e-learning κτλ) είναι επαρκής;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Η ηλεκτρονική υποστήριξη του μαθήματος (e-class, e-learning κτλ) είναι επαρκής;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={question22}
                  label="Η ηλεκτρονική υποστήριξη του μαθήματος (e-class, e-learning κτλ) είναι επαρκής;"
                  onChange={(e) => setQuestion22(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Οι τεχνολογίες πληροφορικής και επικοινωνιών που χρησιμοποιούνται είναι οι κατάλληλες;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Οι τεχνολογίες πληροφορικής και επικοινωνιών που χρησιμοποιούνται είναι οι κατάλληλες;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={question23}
                  label="Οι τεχνολογίες πληροφορικής και επικοινωνιών που χρησιμοποιούνται είναι οι κατάλληλες;"
                  onChange={(e) => setQuestion23(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <br/>
          <h1 style={{textAlign: 'center'}}>Ο διδάσκων/ουσα</h1>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Επιτυγχάνει να διεγείρει το ενδιαφέρον για το αντικείμενο του μαθήματος;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Επιτυγχάνει να διεγείρει το ενδιαφέρον για το αντικείμενο του μαθήματος;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={question24}
                  label="Επιτυγχάνει να διεγείρει το ενδιαφέρον για το αντικείμενο του μαθήματος;"
                  onChange={(e) => setQuestion24(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Αναλύει και παρουσιάζει τις έννοιες με τρόπο απλό χρησιμοποιώντας παραδείγματα;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Αναλύει και παρουσιάζει τις έννοιες με τρόπο απλό χρησιμοποιώντας παραδείγματα;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={question25}
                  label="Αναλύει και παρουσιάζει τις έννοιες με τρόπο απλό χρησιμοποιώντας παραδείγματα;"
                  onChange={(e) => setQuestion25(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Είναι καλά προετοιμασμένος/η;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Είναι καλά προετοιμασμένος/η;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={question26}
                  label="Είναι καλά προετοιμασμένος/η;"
                  onChange={(e) => setQuestion26(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Είναι συνεπής στις υποχρεώσεις του;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Είναι συνεπής στις υποχρεώσεις του;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={question27}
                  label="Είναι συνεπής στις υποχρεώσεις του;"
                  onChange={(e) => setQuestion27(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Είναι μεταδοτικός;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Είναι μεταδοτικός;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={question28}
                  label="Είναι μεταδοτικός;"
                  onChange={(e) => setQuestion28(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Ενθαρρύνει τους φοιτητές να διατυπώσουν απορίες και ερωτήσεις;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Ενθαρρύνει τους φοιτητές να διατυπώσουν απορίες και ερωτήσεις;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={question29}
                  label="Ενθαρρύνει τους φοιτητές να διατυπώσουν απορίες και ερωτήσεις;"
                  onChange={(e) => setQuestion29(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Είναι προσιτός/η στους φοιτητές;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Είναι προσιτός/η στους φοιτητές;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={question30}
                  label="Είναι προσιτός/η στους φοιτητές;"
                  onChange={(e) => setQuestion30(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Είναι απίστευτα όμορφος/η;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Είναι απίστευτα όμορφος/η;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={question31}
                  label="Είναι απίστευτα όμορφος/η;"
                  onChange={(e) => setQuestion31(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <br/>
          <h1 style={{textAlign: 'center'}}>Εγώ ο Φοιτητής</h1>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Παρακολουθώ τις διαλέξεις;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Παρακολουθώ τις διαλέξεις;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={question32}
                  label="Παρακολουθώ τις διαλέξεις;"
                  onChange={(e) => setQuestion32(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Μελετώ συστηματικά την ύλη;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Μελετώ συστηματικά την ύλη;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={question33}
                  label="Μελετώ συστηματικά την ύλη;"
                  onChange={(e) => setQuestion33(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Χρησιμοποιώ τη βιβλιοθήκη τους Ιδρύματος για τη μελέτη πρόσθετης βιβλιογραφίας σχετικής με το μάθημα;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Χρησιμοποιώ τη βιβλιοθήκη τους Ιδρύματος για τη μελέτη πρόσθετης βιβλιογραφίας σχετικής με το μάθημα;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={question34}
                  label="Χρησιμοποιώ τη βιβλιοθήκη τους Ιδρύματος για τη μελέτη πρόσθετης βιβλιογραφίας σχετικής με το μάθημα;"
                  onChange={(e) => setQuestion34(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Χρησιμοποιώ πηγές του διαδικτύου για τη μελέτη πρόσθετης βιβλιογραφίας σχετικής με το μάθημα;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Χρησιμοποιώ πηγές του διαδικτύου για τη μελέτη πρόσθετης βιβλιογραφίας σχετικής με το μάθημα;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={question35}
                  label="Χρησιμοποιώ πηγές του διαδικτύου για τη μελέτη πρόσθετης βιβλιογραφίας σχετικής με το μάθημα;"
                  onChange={(e) => setQuestion35(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              item
              md={12}
              xs={12}
              style={{textAlign: "center"}}
            >
              <h4>Αφιερώνω εβδομαδιαία για μελέτη του συγκεκριμένου μαθήματος: 1:Καθόλου 2: Λιγότερο από μια ώρα 3: 1-2 Ώρες 4: 2-3 Ώρες 5: Περισσότερο από 3 ώρες;</h4>
              <br/>
              <FormControl
                style={{width: "70%"}}
              >
                <InputLabel id="demo-simple-select-label">Αφιερώνω εβδομαδιαία για μελέτη του συγκεκριμένου μαθήματος: 1:Καθόλου 2: Λιγότερο από μια ώρα 3: 1-2 Ώρες 4: 2-3 Ώρες 5: Περισσότερο από 3 ώρες;</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={question36}
                  label="Αφιερώνω εβδομαδιαία για μελέτη του συγκεκριμένου μαθήματος: 1:Καθόλου 2: Λιγότερο από μια ώρα 3: 1-2 Ώρες 4: 2-3 Ώρες 5: Περισσότερο από 3 ώρες;"
                  onChange={(e) => setQuestion36(e.target.value)}
                  style={{textAlign: "left"}}
                >
                  <MenuItem value={5}>Απόλυτα</MenuItem>
                  <MenuItem value={4}>Πολύ</MenuItem>
                  <MenuItem value={3}>Μερικώς</MenuItem>
                  <MenuItem value={2}>Λίγο</MenuItem>
                  <MenuItem value={1}>Ελάχιστα</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br/>
          <br/>
          <Box textAlign='center'>
            <Button variant="contained"
                    onClick={submitAnswers}>Υποβολή</Button>
          </Box>
          <br/>
          <br/>
        </>
      }
      {tokenHasEvaluation &&
        <>
          <EvaluationDone
            onClose={() => router.push('/').then()}
          />
        </>
      }
      {evaluationSaved &&
        <>
          <EvaluationSubmit
            onClose={() => router.push("/").then()}
          />
        </>
      }
      {evaluationError &&
        <EvaluationError
          onClose={() => setEvaluationError(false)}
        />
      }
    </>
  )
}

function EvaluationPage(){
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()
  const {token} = router.query
  return <EvaluationSinglePage token={token}/>
}

export default EvaluationPage;
