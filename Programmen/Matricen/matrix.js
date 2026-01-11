let A = [],
  B = [];

function createMatrices() {
  const r = +rows.value;
  const c = +cols.value;

  A = createMatrix("matrixA", r, c);
  B = createMatrix("matrixB", r, c);
  clearResult();
}

function createMatrix(id, r, c) {
  const container = document.getElementById(id);
  container.innerHTML = "";

  const grid = document.createElement("div");
  grid.className = "matrix";
  grid.style.gridTemplateColumns = `repeat(${c}, auto)`;

  let M = [];
  for (let i = 0; i < r; i++) {
    M[i] = [];
    for (let j = 0; j < c; j++) {
      const input = document.createElement("input");
      input.type = "number";
      input.value = 0;
      input.oninput = () => (M[i][j] = +input.value);
      grid.appendChild(input);
      M[i][j] = 0;
    }
  }
  container.appendChild(grid);
  return M;
}

function clearResult() {
  result.innerHTML = "";
}

function showMatrix(M) {
  return M.map((r) => r.map((x) => x.toFixed(3)).join("\t")).join("\n");
}

/* ---------- Operations ---------- */

function detA() {
  if (A.length !== A[0].length) return alert("A must be square");
  result.innerHTML = `<pre>det(A) = ${det(A)}</pre>`;
}

function transposeA() {
  result.innerHTML = `<pre>${showMatrix(transpose(A))}</pre>`;
}

function inverseA() {
  const inv = inverse(A);
  if (!inv) return alert("A is singular");
  result.innerHTML = `<pre>${showMatrix(inv)}</pre>`;
}

function traceA() {
  if (A.length !== A[0].length) return alert("A must be square");
  let t = A.reduce((s, r, i) => s + r[i], 0);
  result.innerHTML = `<pre>tr(A) = ${t}</pre>`;
}

function rankA() {
  result.innerHTML = `<pre>rank(A) = ${rank(A)}</pre>`;
}

function rrefA() {
  result.innerHTML = `<pre>${showMatrix(rref(A))}</pre>`;
}

function addAB() {
  if (A.length !== B.length || A[0].length !== B[0].length)
    return alert("Same dimensions required");
  result.innerHTML = `<pre>${showMatrix(add(A, B))}</pre>`;
}

function multiplyAB() {
  if (A[0].length !== B.length) return alert("Incompatible dimensions");
  result.innerHTML = `<pre>${showMatrix(multiply(A, B))}</pre>`;
}

/* ---------- Linear Algebra Core ---------- */

const transpose = (M) => M[0].map((_, i) => M.map((r) => r[i]));

function det(M) {
  if (M.length === 1) return M[0][0];
  if (M.length === 2) return M[0][0] * M[1][1] - M[0][1] * M[1][0];

  return M[0].reduce(
    (s, x, j) => s + (j % 2 ? -1 : 1) * x * det(minor(M, 0, j)),
    0
  );
}

const minor = (M, r, c) =>
  M.filter((_, i) => i !== r).map((row) => row.filter((_, j) => j !== c));

function inverse(M) {
  let n = M.length;
  let A = M.map((r) => r.slice());
  let I = [...Array(n)].map((_, i) =>
    Array(n)
      .fill(0)
      .map((_, j) => i === j)
  );

  for (let i = 0; i < n; i++) {
    if (A[i][i] === 0) return null;
    let p = A[i][i];
    for (let j = 0; j < n; j++) {
      A[i][j] /= p;
      I[i][j] /= p;
    }
    for (let r = 0; r < n; r++)
      if (r !== i) {
        let f = A[r][i];
        for (let c = 0; c < n; c++) {
          A[r][c] -= f * A[i][c];
          I[r][c] -= f * I[i][c];
        }
      }
  }
  return I;
}

const add = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));

function multiply(A, B) {
  return A.map((r) =>
    B[0].map((_, j) => r.reduce((s, x, i) => s + x * B[i][j], 0))
  );
}

function rank(M) {
  return rref(M).filter((r) => r.some((x) => Math.abs(x) > 1e-9)).length;
}

function rref(M) {
  let A = M.map((r) => r.slice());
  let lead = 0;
  for (let r = 0; r < A.length; r++) {
    if (lead >= A[0].length) return A;
    let i = r;
    while (A[i][lead] === 0) {
      i++;
      if (i === A.length) {
        i = r;
        lead++;
        if (lead === A[0].length) return A;
      }
    }
    [A[i], A[r]] = [A[r], A[i]];
    let lv = A[r][lead];
    A[r] = A[r].map((x) => x / lv);
    for (let i = 0; i < A.length; i++)
      if (i !== r) A[i] = A[i].map((x, j) => x - A[i][lead] * A[r][j]);
    lead++;
  }
  return A;
}
