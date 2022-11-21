export function numberToWords(num: number) {
  return __cf_convert_number(num);
}

function __cf_convert_number(number: number) {
  const originalValueParam = number;
  if (number < 0 || number > 999999999) {
    // throw Error('N\u00famero fuera de rango');
    return ('N\u00famero fuera de rango');
  }
  var millon = Math.floor(number / 1000000);
  number -= millon * 1000000;
  var cientosDeMiles = Math.floor(number / 100000);
  number -= cientosDeMiles * 100000;
  var miles = Math.floor(number / 1000);
  number -= miles * 1000;
  var centenas = Math.floor(number / 100);
  number = number % 100;
  var tn = Math.floor(number / 10);
  var one = Math.floor(number % 10);
  var res = '';

  var cientos = Array(
    '',
    'cien',
    'doscientos',
    'trescientos',
    'cuatrocientos',
    'quinientos',
    'seiscientos',
    'setecientos',
    'ochocientos',
    'novecientos'
  );
  if (millon > 0) {
    res +=
      __cf_convert_number(millon) +
      (millon === 1 ? ' mill\u00f3n' : ' millones');
  }
  if (cientosDeMiles > 0) {
    res +=
      (res == '' ? '' : ' ') +
      cientos[cientosDeMiles] +
      (miles > 0 || centenas > 0 || tn > 0 || one < 0
        ? cientosDeMiles == 1
          ? 'to '
          : ' '
        : '');
  }
  if (miles > 0) {
    res += (res == '' ? '' : ' ') + __cf_convert_number(miles) + ' mil';
  }
  if (centenas) {
    res +=
      (res == '' ? '' : ' ') +
      cientos[centenas] +
      (tn > 0 || one > 0 ? (centenas > 1 ? ' ' : 'to ') : '');
  }

  var ones = Array(
    '',
    'un',
    'dos',
    'tres',
    'cuatro',
    'cinco',
    'seis',
    'siete',
    'ocho',
    'nueve',
    'diez',
    'once',
    'doce',
    'trece',
    'catorce',
    'quince',
    'dieciseis',
    'diecisiete',
    'dieciocho',
    'diecinueve'
  );
  var tens = Array(
    '',
    '',
    'veinte',
    'treinta',
    'cuarenta',
    'cincuenta',
    'sesenta',
    'setenta',
    'ochenta',
    'noventa'
  );

  if (tn > 0 || one > 0) {
    if (tn < 2) {
      res += ones[tn * 10 + one];
    } else {
      if (tn === 2 && one > 0) res += 'veinti' + ones[one];
      else {
        res += tens[tn];
        if (one > 0) {
          res += ' y ' + ones[one];
        }
      }
    }
  }

  if (originalValueParam >= 100000 && cientos.find((val) => val === res)) {
    res += ' mil';
  }

  if (res == '') {
    res = 'cero';
  }
  return res.replace('  ', ' ');
}

// Extracted from here: https://stackoverflow.com/a/52432088
