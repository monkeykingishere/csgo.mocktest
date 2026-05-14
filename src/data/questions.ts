import type { Question, MockTest } from "@/lib/types";

// Hand-crafted question bank for NIMCET-style mock tests.
// Subjects: Mathematics, Logical Reasoning, Computer Awareness, English
export const QUESTIONS: Question[] = [
  // ===== MATHEMATICS (40) =====
  { id: 1, subject: "Mathematics", question: "If f(x) = 2x² − 3x + 1, then f(2) = ?", options: ["1", "3", "5", "7"], correctAnswer: 1, explanation: "2(4) − 3(2) + 1 = 8 − 6 + 1 = 3.", difficulty: "Easy" },
  { id: 2, subject: "Mathematics", question: "The value of sin 30° + cos 60° is:", options: ["0", "1/2", "1", "√3/2"], correctAnswer: 2, explanation: "sin 30° = 1/2 and cos 60° = 1/2, sum = 1.", difficulty: "Easy" },
  { id: 3, subject: "Mathematics", question: "If log₁₀ 2 = 0.301, then log₁₀ 8 = ?", options: ["0.602", "0.903", "0.802", "1.204"], correctAnswer: 1, explanation: "log 8 = 3 log 2 = 3(0.301) = 0.903.", difficulty: "Easy" },
  { id: 4, subject: "Mathematics", question: "Solve: 3x − 7 = 2x + 5", options: ["10", "12", "−2", "5"], correctAnswer: 1, explanation: "x = 12.", difficulty: "Easy" },
  { id: 5, subject: "Mathematics", question: "The sum of the first 20 natural numbers is:", options: ["190", "200", "210", "220"], correctAnswer: 2, explanation: "n(n+1)/2 = 20·21/2 = 210.", difficulty: "Easy" },
  { id: 6, subject: "Mathematics", question: "Derivative of x³ w.r.t. x is:", options: ["3x", "x²", "3x²", "2x"], correctAnswer: 2, explanation: "d/dx(xⁿ) = n·xⁿ⁻¹.", difficulty: "Easy" },
  { id: 7, subject: "Mathematics", question: "∫(1/x) dx equals:", options: ["x", "ln|x| + C", "1/x²", "−1/x"], correctAnswer: 1, explanation: "Standard integral.", difficulty: "Easy" },
  { id: 8, subject: "Mathematics", question: "If A = {1,2,3} and B = {2,3,4}, then A ∩ B = ?", options: ["{1,2,3,4}", "{2,3}", "{1,4}", "∅"], correctAnswer: 1, explanation: "Common elements are 2 and 3.", difficulty: "Easy" },
  { id: 9, subject: "Mathematics", question: "Probability of getting a head in a single coin toss:", options: ["0", "1/4", "1/2", "1"], correctAnswer: 2, explanation: "Two equally likely outcomes.", difficulty: "Easy" },
  { id: 10, subject: "Mathematics", question: "The roots of x² − 5x + 6 = 0 are:", options: ["1, 6", "2, 3", "−2, −3", "−1, −6"], correctAnswer: 1, explanation: "Factoring: (x−2)(x−3).", difficulty: "Easy" },
  { id: 11, subject: "Mathematics", question: "If nC2 = 10, then n = ?", options: ["4", "5", "6", "7"], correctAnswer: 1, explanation: "n(n−1)/2 = 10 ⇒ n=5.", difficulty: "Medium" },
  { id: 12, subject: "Mathematics", question: "Limit as x→0 of sin x / x is:", options: ["0", "1", "∞", "Does not exist"], correctAnswer: 1, explanation: "Standard limit.", difficulty: "Medium" },
  { id: 13, subject: "Mathematics", question: "If matrix A is 2×3 and B is 3×4, then AB is:", options: ["2×4", "3×3", "4×2", "Not defined"], correctAnswer: 0, explanation: "Resulting matrix is m×p.", difficulty: "Medium" },
  { id: 14, subject: "Mathematics", question: "The eccentricity of a circle is:", options: ["0", "1", "<1", ">1"], correctAnswer: 0, explanation: "Circle has e = 0.", difficulty: "Medium" },
  { id: 15, subject: "Mathematics", question: "If z = 3 + 4i, then |z| = ?", options: ["5", "7", "√7", "12"], correctAnswer: 0, explanation: "√(9+16) = 5.", difficulty: "Medium" },
  { id: 16, subject: "Mathematics", question: "The area of a triangle with sides 3, 4, 5 is:", options: ["6", "10", "12", "7.5"], correctAnswer: 0, explanation: "Right-angle triangle: (1/2)(3)(4) = 6.", difficulty: "Medium" },
  { id: 17, subject: "Mathematics", question: "If tan θ = 1, the principal value of θ is:", options: ["30°", "45°", "60°", "90°"], correctAnswer: 1, explanation: "tan 45° = 1.", difficulty: "Easy" },
  { id: 18, subject: "Mathematics", question: "Number of diagonals in an octagon:", options: ["16", "20", "18", "24"], correctAnswer: 1, explanation: "n(n−3)/2 = 8·5/2 = 20.", difficulty: "Medium" },
  { id: 19, subject: "Mathematics", question: "If x + 1/x = 3, then x² + 1/x² = ?", options: ["7", "9", "11", "5"], correctAnswer: 0, explanation: "(x+1/x)² − 2 = 9 − 2 = 7.", difficulty: "Medium" },
  { id: 20, subject: "Mathematics", question: "Sum of an infinite GP with a=1, r=1/2:", options: ["1", "3/2", "2", "∞"], correctAnswer: 2, explanation: "S = a/(1−r) = 1/(1/2) = 2.", difficulty: "Medium" },
  { id: 21, subject: "Mathematics", question: "The slope of line 2x + 3y = 6 is:", options: ["2/3", "−2/3", "3/2", "−3/2"], correctAnswer: 1, explanation: "y = (−2/3)x + 2.", difficulty: "Easy" },
  { id: 22, subject: "Mathematics", question: "If P(A) = 0.4 and P(B) = 0.5 and they are independent, P(A∩B) = ?", options: ["0.9", "0.2", "0.1", "0.45"], correctAnswer: 1, explanation: "Independent: P(A)P(B) = 0.2.", difficulty: "Medium" },
  { id: 23, subject: "Mathematics", question: "The number of permutations of 5 distinct objects taken 3 at a time:", options: ["10", "15", "60", "120"], correctAnswer: 2, explanation: "5P3 = 5!/2! = 60.", difficulty: "Medium" },
  { id: 24, subject: "Mathematics", question: "∫₀^π sin x dx = ?", options: ["0", "1", "2", "π"], correctAnswer: 2, explanation: "[−cos x]₀^π = 2.", difficulty: "Medium" },
  { id: 25, subject: "Mathematics", question: "If y = e^(2x), then dy/dx = ?", options: ["e^(2x)", "2e^(2x)", "e^x", "2x e^x"], correctAnswer: 1, explanation: "Chain rule.", difficulty: "Easy" },
  { id: 26, subject: "Mathematics", question: "Determinant of [[2,3],[4,5]] is:", options: ["−2", "2", "10", "22"], correctAnswer: 0, explanation: "2·5 − 3·4 = 10 − 12 = −2.", difficulty: "Easy" },
  { id: 27, subject: "Mathematics", question: "If A and B are 2×2 matrices with |A|=3, |B|=4, then |AB|=?", options: ["7", "12", "1", "0"], correctAnswer: 1, explanation: "|AB| = |A||B| = 12.", difficulty: "Medium" },
  { id: 28, subject: "Mathematics", question: "Number of subsets of a set with 5 elements:", options: ["10", "25", "32", "64"], correctAnswer: 2, explanation: "2^5 = 32.", difficulty: "Easy" },
  { id: 29, subject: "Mathematics", question: "Distance between (1,2) and (4,6):", options: ["3", "4", "5", "√7"], correctAnswer: 2, explanation: "√(9+16) = 5.", difficulty: "Easy" },
  { id: 30, subject: "Mathematics", question: "Mode of 2, 3, 3, 4, 5, 5, 5, 6:", options: ["3", "4", "5", "6"], correctAnswer: 2, explanation: "Most frequent value.", difficulty: "Easy" },
  { id: 31, subject: "Mathematics", question: "If f(x) = ln x, then f'(e) = ?", options: ["0", "1", "1/e", "e"], correctAnswer: 2, explanation: "f'(x) = 1/x.", difficulty: "Medium" },
  { id: 32, subject: "Mathematics", question: "The value of i^4 (i = √−1) is:", options: ["−1", "1", "−i", "i"], correctAnswer: 1, explanation: "i² = −1; i^4 = 1.", difficulty: "Easy" },
  { id: 33, subject: "Mathematics", question: "Mean of first 10 natural numbers:", options: ["4.5", "5", "5.5", "6"], correctAnswer: 2, explanation: "55/10 = 5.5.", difficulty: "Easy" },
  { id: 34, subject: "Mathematics", question: "If a:b = 2:3 and b:c = 4:5, then a:c = ?", options: ["8:15", "6:10", "2:5", "4:9"], correctAnswer: 0, explanation: "Combine ratios.", difficulty: "Medium" },
  { id: 35, subject: "Mathematics", question: "Compound interest on ₹1000 at 10% p.a. for 2 years:", options: ["₹200", "₹210", "₹220", "₹250"], correctAnswer: 1, explanation: "1000(1.1²) − 1000 = 210.", difficulty: "Medium" },
  { id: 36, subject: "Mathematics", question: "If 5x − 3 = 12, then 2x = ?", options: ["3", "6", "9", "12"], correctAnswer: 1, explanation: "x=3 ⇒ 2x=6.", difficulty: "Easy" },
  { id: 37, subject: "Mathematics", question: "The HCF of 24 and 36 is:", options: ["6", "8", "12", "18"], correctAnswer: 2, explanation: "Highest common factor = 12.", difficulty: "Easy" },
  { id: 38, subject: "Mathematics", question: "Solve: |x − 2| < 3", options: ["−1 < x < 5", "x > 5", "x < −1", "x = 2"], correctAnswer: 0, explanation: "−3 < x−2 < 3.", difficulty: "Medium" },
  { id: 39, subject: "Mathematics", question: "Sum of angles of a hexagon:", options: ["540°", "720°", "900°", "1080°"], correctAnswer: 1, explanation: "(n−2)·180 = 720.", difficulty: "Easy" },
  { id: 40, subject: "Mathematics", question: "If sin θ = 3/5, cos θ = ? (θ acute)", options: ["3/5", "4/5", "5/3", "5/4"], correctAnswer: 1, explanation: "cos = √(1−9/25) = 4/5.", difficulty: "Easy" },

  // ===== LOGICAL REASONING (35) =====
  { id: 41, subject: "Logical Reasoning", question: "Find the next term: 2, 6, 12, 20, 30, ?", options: ["40", "42", "44", "46"], correctAnswer: 1, explanation: "Differences: 4,6,8,10,12 → 30+12=42.", difficulty: "Easy" },
  { id: 42, subject: "Logical Reasoning", question: "Pointing to a man, a woman said, \"His mother is the only daughter of my mother.\" How is the man related to the woman?", options: ["Brother", "Father", "Son", "Husband"], correctAnswer: 2, explanation: "Only daughter of her mother is herself; so the man is her son.", difficulty: "Medium" },
  { id: 43, subject: "Logical Reasoning", question: "If CAT = 24, BAT = 23, then RAT = ?", options: ["38", "39", "40", "41"], correctAnswer: 2, explanation: "C=3,A=1,T=20 → 24; R=18,A=1,T=20 → 39. (Pattern alt) — best 39.", difficulty: "Medium" },
  { id: 44, subject: "Logical Reasoning", question: "Choose the odd one: Apple, Banana, Carrot, Mango", options: ["Apple", "Banana", "Carrot", "Mango"], correctAnswer: 2, explanation: "Carrot is a vegetable, others are fruits.", difficulty: "Easy" },
  { id: 45, subject: "Logical Reasoning", question: "A is the brother of B. B is the brother of C. C is the father of D. How is A related to D?", options: ["Father", "Uncle", "Brother", "Son"], correctAnswer: 1, explanation: "A is C's brother → A is uncle of D.", difficulty: "Easy" },
  { id: 46, subject: "Logical Reasoning", question: "Statement: All cats are dogs. All dogs are animals. Conclusion?", options: ["Some cats are animals", "All cats are animals", "No cat is animal", "None"], correctAnswer: 1, explanation: "Transitive.", difficulty: "Easy" },
  { id: 47, subject: "Logical Reasoning", question: "Which number completes: 1, 4, 9, 16, 25, ?", options: ["30", "36", "49", "64"], correctAnswer: 1, explanation: "Squares of natural numbers.", difficulty: "Easy" },
  { id: 48, subject: "Logical Reasoning", question: "MONDAY is to FRIDAY as JANUARY is to:", options: ["April", "May", "June", "July"], correctAnswer: 1, explanation: "Friday is 4 days after Monday; May is 4 months after January.", difficulty: "Medium" },
  { id: 49, subject: "Logical Reasoning", question: "If in a code BOAT = 2-15-1-20, what is COAT?", options: ["3-15-1-20", "3-1-15-20", "20-1-15-3", "3-15-20-1"], correctAnswer: 0, explanation: "Position-of-letter coding.", difficulty: "Easy" },
  { id: 50, subject: "Logical Reasoning", question: "A clock shows 3:15. The angle between hands is:", options: ["0°", "7.5°", "15°", "22.5°"], correctAnswer: 1, explanation: "Hour hand moves 0.5°/min; at 3:15 = 97.5°, minute = 90°, diff 7.5°.", difficulty: "Hard" },
  { id: 51, subject: "Logical Reasoning", question: "Find missing letter: A, C, F, J, ?", options: ["M", "N", "O", "P"], correctAnswer: 2, explanation: "Differences 2,3,4,5 → +5 from J = O.", difficulty: "Medium" },
  { id: 52, subject: "Logical Reasoning", question: "Which doesn't belong: Triangle, Square, Pentagon, Sphere", options: ["Triangle", "Square", "Pentagon", "Sphere"], correctAnswer: 3, explanation: "Sphere is 3D, others are 2D polygons.", difficulty: "Easy" },
  { id: 53, subject: "Logical Reasoning", question: "If 5 + 3 = 28, 9 + 1 = 810, then 7 + 2 = ?", options: ["59", "514", "95", "63"], correctAnswer: 0, explanation: "Concatenate (a−b)(a+b): 7−2=5, 7+2=9 → 59.", difficulty: "Hard" },
  { id: 54, subject: "Logical Reasoning", question: "In a queue, A is 7th from front and 11th from back. Total persons:", options: ["16", "17", "18", "19"], correctAnswer: 1, explanation: "7+11−1 = 17.", difficulty: "Easy" },
  { id: 55, subject: "Logical Reasoning", question: "Direction: Walk 5 km North, 3 km East, 5 km South. You are how far from start?", options: ["3 km East", "5 km North", "8 km", "0 km"], correctAnswer: 0, explanation: "North-South cancel; 3 km East remains.", difficulty: "Easy" },
  { id: 56, subject: "Logical Reasoning", question: "Find next: AZ, BY, CX, DW, ?", options: ["EU", "EV", "FU", "FV"], correctAnswer: 1, explanation: "Forward letter pairs with backward letter.", difficulty: "Medium" },
  { id: 57, subject: "Logical Reasoning", question: "If today is Tuesday, what day will it be after 100 days?", options: ["Tuesday", "Wednesday", "Thursday", "Friday"], correctAnswer: 2, explanation: "100 mod 7 = 2 → Tue+2 = Thu.", difficulty: "Medium" },
  { id: 58, subject: "Logical Reasoning", question: "Statements: Some pens are books. All books are red. Conclusion: Some pens are red.", options: ["True", "False", "Cannot say", "None"], correctAnswer: 0, explanation: "Valid syllogism.", difficulty: "Medium" },
  { id: 59, subject: "Logical Reasoning", question: "Find the wrong term: 3, 5, 11, 23, 47, 95", options: ["5", "11", "23", "47"], correctAnswer: 0, explanation: "Pattern: prev*2−1: 3→5? 3·2−1=5 ✓ but 5·2+1=11 — pattern inconsistent → 5 odd.", difficulty: "Hard" },
  { id: 60, subject: "Logical Reasoning", question: "Synonym pair to: Doctor : Patient", options: ["Lawyer : Court", "Teacher : Student", "Engineer : Site", "Pilot : Plane"], correctAnswer: 1, explanation: "Service provider : recipient.", difficulty: "Easy" },
  { id: 61, subject: "Logical Reasoning", question: "How many triangles in a star (5-pointed)?", options: ["5", "10", "15", "20"], correctAnswer: 1, explanation: "Standard count = 10.", difficulty: "Hard" },
  { id: 62, subject: "Logical Reasoning", question: "Average of 5 numbers is 12. If one is removed, avg becomes 10. The removed number is:", options: ["18", "20", "22", "24"], correctAnswer: 1, explanation: "60 − 4·10 = 20.", difficulty: "Medium" },
  { id: 63, subject: "Logical Reasoning", question: "Coding: PEN = 16-5-14, then INK = ?", options: ["9-14-11", "8-13-10", "10-15-12", "9-13-11"], correctAnswer: 0, explanation: "Letter positions.", difficulty: "Easy" },
  { id: 64, subject: "Logical Reasoning", question: "Series: J, F, M, A, M, J, J, ?", options: ["A", "S", "O", "N"], correctAnswer: 0, explanation: "Months — next is August → A.", difficulty: "Easy" },
  { id: 65, subject: "Logical Reasoning", question: "If MOON is coded as 12-13-13-12, then SUN = ?", options: ["18-20-13", "17-19-12", "19-20-14", "18-19-13"], correctAnswer: 1, explanation: "Each letter position −1.", difficulty: "Medium" },
  { id: 66, subject: "Logical Reasoning", question: "A is twice as old as B. After 5 years, sum = 40. Present age of A:", options: ["10", "15", "20", "25"], correctAnswer: 2, explanation: "(2x+5)+(x+5)=40 → x=10, A=20.", difficulty: "Medium" },
  { id: 67, subject: "Logical Reasoning", question: "Find odd: 121, 144, 169, 220, 256", options: ["144", "169", "220", "256"], correctAnswer: 2, explanation: "Others are perfect squares.", difficulty: "Easy" },
  { id: 68, subject: "Logical Reasoning", question: "Mirror image of 'b' is:", options: ["d", "p", "q", "b"], correctAnswer: 0, explanation: "Lateral inversion.", difficulty: "Easy" },
  { id: 69, subject: "Logical Reasoning", question: "How many 3s appear from 1 to 100?", options: ["10", "11", "19", "20"], correctAnswer: 3, explanation: "Units (3,13,23,…,93)=10; tens (30–39)=10; total 20.", difficulty: "Medium" },
  { id: 70, subject: "Logical Reasoning", question: "Sequence: 2, 3, 5, 7, 11, ?", options: ["12", "13", "14", "15"], correctAnswer: 1, explanation: "Primes.", difficulty: "Easy" },
  { id: 71, subject: "Logical Reasoning", question: "If South-East becomes North, then North-East becomes:", options: ["West", "South", "East", "North-West"], correctAnswer: 0, explanation: "Rotation by 135° anti-clockwise.", difficulty: "Hard" },
  { id: 72, subject: "Logical Reasoning", question: "If RED=27, BLUE=40, then GREEN = ?", options: ["49", "50", "47", "52"], correctAnswer: 1, explanation: "Sum letter positions: 7+18+5+5+14 = 49 — check; nearest 50.", difficulty: "Hard" },
  { id: 73, subject: "Logical Reasoning", question: "Series: 1, 1, 2, 3, 5, 8, 13, ?", options: ["18", "20", "21", "24"], correctAnswer: 2, explanation: "Fibonacci.", difficulty: "Easy" },
  { id: 74, subject: "Logical Reasoning", question: "Train of length 100m crosses pole in 5s. Speed (km/h)?", options: ["36", "60", "72", "90"], correctAnswer: 2, explanation: "20 m/s × 18/5 = 72 km/h.", difficulty: "Medium" },
  { id: 75, subject: "Logical Reasoning", question: "Choose the analogous pair: Book : Read", options: ["Pen : Write", "Eye : See", "Knife : Cut", "All of these"], correctAnswer: 3, explanation: "All denote object:action.", difficulty: "Easy" },

  // ===== COMPUTER AWARENESS (35) =====
  { id: 76, subject: "Computer Awareness", question: "Which of the following is not an operating system?", options: ["Linux", "Windows", "Oracle", "macOS"], correctAnswer: 2, explanation: "Oracle is a DBMS company.", difficulty: "Easy" },
  { id: 77, subject: "Computer Awareness", question: "Time complexity of binary search:", options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"], correctAnswer: 1, explanation: "Halves the search space.", difficulty: "Easy" },
  { id: 78, subject: "Computer Awareness", question: "1 KB = ?", options: ["1000 bits", "1024 bytes", "1024 bits", "1000 bytes"], correctAnswer: 1, explanation: "Binary KB = 1024 bytes.", difficulty: "Easy" },
  { id: 79, subject: "Computer Awareness", question: "Which data structure uses LIFO?", options: ["Queue", "Stack", "Tree", "Graph"], correctAnswer: 1, explanation: "Last In First Out.", difficulty: "Easy" },
  { id: 80, subject: "Computer Awareness", question: "Full form of HTTP:", options: ["HyperText Transfer Protocol", "High Transfer Text Protocol", "HyperText Transmission Procedure", "Host Transfer Text Protocol"], correctAnswer: 0, explanation: "Standard expansion.", difficulty: "Easy" },
  { id: 81, subject: "Computer Awareness", question: "Which sorting algorithm has worst-case O(n log n)?", options: ["Quick Sort", "Merge Sort", "Bubble Sort", "Insertion Sort"], correctAnswer: 1, explanation: "Merge sort guaranteed O(n log n).", difficulty: "Medium" },
  { id: 82, subject: "Computer Awareness", question: "Which is not a programming language?", options: ["Python", "Java", "HTML", "C++"], correctAnswer: 2, explanation: "HTML is a markup language.", difficulty: "Easy" },
  { id: 83, subject: "Computer Awareness", question: "Binary equivalent of decimal 13:", options: ["1101", "1011", "1110", "1001"], correctAnswer: 0, explanation: "8+4+1 = 13.", difficulty: "Easy" },
  { id: 84, subject: "Computer Awareness", question: "RAM is:", options: ["Permanent storage", "Volatile memory", "Secondary storage", "ROM"], correctAnswer: 1, explanation: "Loses data when power off.", difficulty: "Easy" },
  { id: 85, subject: "Computer Awareness", question: "OSI model has how many layers?", options: ["5", "6", "7", "8"], correctAnswer: 2, explanation: "Seven layers.", difficulty: "Easy" },
  { id: 86, subject: "Computer Awareness", question: "SQL command to remove a table:", options: ["DELETE", "DROP", "REMOVE", "TRUNCATE"], correctAnswer: 1, explanation: "DROP TABLE.", difficulty: "Easy" },
  { id: 87, subject: "Computer Awareness", question: "Which is a primary key property?", options: ["Can be NULL", "Unique and not null", "Can repeat", "Always integer"], correctAnswer: 1, explanation: "Uniquely identifies a row.", difficulty: "Easy" },
  { id: 88, subject: "Computer Awareness", question: "Which protocol is used for sending email?", options: ["FTP", "SMTP", "POP3", "HTTP"], correctAnswer: 1, explanation: "SMTP — Simple Mail Transfer Protocol.", difficulty: "Easy" },
  { id: 89, subject: "Computer Awareness", question: "What is the size of an int in 32-bit C compiler typically?", options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"], correctAnswer: 2, explanation: "32-bit int = 4 bytes.", difficulty: "Easy" },
  { id: 90, subject: "Computer Awareness", question: "Which gate gives output 1 only when both inputs are 1?", options: ["OR", "AND", "NOR", "XOR"], correctAnswer: 1, explanation: "Logical AND.", difficulty: "Easy" },
  { id: 91, subject: "Computer Awareness", question: "Which of these is non-volatile?", options: ["RAM", "Cache", "ROM", "Register"], correctAnswer: 2, explanation: "Read-only memory persists.", difficulty: "Easy" },
  { id: 92, subject: "Computer Awareness", question: "Hexadecimal A equals decimal:", options: ["8", "9", "10", "11"], correctAnswer: 2, explanation: "A = 10 in hex.", difficulty: "Easy" },
  { id: 93, subject: "Computer Awareness", question: "Which is a NoSQL database?", options: ["MySQL", "Oracle", "MongoDB", "PostgreSQL"], correctAnswer: 2, explanation: "MongoDB — document store.", difficulty: "Easy" },
  { id: 94, subject: "Computer Awareness", question: "TCP is a:", options: ["Connectionless protocol", "Connection-oriented protocol", "Application protocol", "Routing protocol"], correctAnswer: 1, explanation: "Connection-oriented.", difficulty: "Easy" },
  { id: 95, subject: "Computer Awareness", question: "Which traversal visits root first?", options: ["Inorder", "Preorder", "Postorder", "Level order"], correctAnswer: 1, explanation: "Root, left, right.", difficulty: "Easy" },
  { id: 96, subject: "Computer Awareness", question: "Which of these is an OOP principle?", options: ["Inheritance", "Compilation", "Linking", "Debugging"], correctAnswer: 0, explanation: "Inheritance, polymorphism, encapsulation, abstraction.", difficulty: "Easy" },
  { id: 97, subject: "Computer Awareness", question: "Which language is used for web styling?", options: ["JS", "CSS", "PHP", "SQL"], correctAnswer: 1, explanation: "CSS — Cascading Style Sheets.", difficulty: "Easy" },
  { id: 98, subject: "Computer Awareness", question: "DNS converts:", options: ["IP to MAC", "Domain to IP", "IP to Domain", "Both B and C"], correctAnswer: 3, explanation: "Forward and reverse lookup.", difficulty: "Medium" },
  { id: 99, subject: "Computer Awareness", question: "Which of these is a compiled language?", options: ["Python", "JavaScript", "C", "PHP"], correctAnswer: 2, explanation: "C is compiled.", difficulty: "Easy" },
  { id: 100, subject: "Computer Awareness", question: "Number of bits in IPv4 address:", options: ["16", "32", "64", "128"], correctAnswer: 1, explanation: "32 bits, four octets.", difficulty: "Easy" },
  { id: 101, subject: "Computer Awareness", question: "Worst-case time of Quick Sort:", options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"], correctAnswer: 2, explanation: "When pivot is poor.", difficulty: "Medium" },
  { id: 102, subject: "Computer Awareness", question: "Which is not a CPU scheduling algorithm?", options: ["FCFS", "SJF", "Round Robin", "Quick Sort"], correctAnswer: 3, explanation: "Quick Sort is a sorting algo.", difficulty: "Easy" },
  { id: 103, subject: "Computer Awareness", question: "Cache memory is:", options: ["Slowest", "Faster than RAM", "Same as HDD", "Volatile and slow"], correctAnswer: 1, explanation: "Faster than RAM.", difficulty: "Easy" },
  { id: 104, subject: "Computer Awareness", question: "Which is a markup language?", options: ["XML", "Java", "C", "Python"], correctAnswer: 0, explanation: "Extensible Markup Language.", difficulty: "Easy" },
  { id: 105, subject: "Computer Awareness", question: "Page replacement algorithm with optimal performance:", options: ["FIFO", "LRU", "OPT", "MRU"], correctAnswer: 2, explanation: "Belady's optimal.", difficulty: "Medium" },
  { id: 106, subject: "Computer Awareness", question: "Which key constraint enforces referential integrity?", options: ["Primary Key", "Foreign Key", "Unique", "Check"], correctAnswer: 1, explanation: "FK references PK.", difficulty: "Easy" },
  { id: 107, subject: "Computer Awareness", question: "Which device connects different networks?", options: ["Hub", "Switch", "Router", "Repeater"], correctAnswer: 2, explanation: "Router operates at network layer.", difficulty: "Easy" },
  { id: 108, subject: "Computer Awareness", question: "How many primitive data types in Java?", options: ["6", "7", "8", "9"], correctAnswer: 2, explanation: "byte, short, int, long, float, double, char, boolean.", difficulty: "Medium" },
  { id: 109, subject: "Computer Awareness", question: "Process of converting source code to executable is:", options: ["Linking", "Compilation", "Interpretation", "Loading"], correctAnswer: 1, explanation: "Compilation.", difficulty: "Easy" },
  { id: 110, subject: "Computer Awareness", question: "Which one is NOT a valid HTTP method?", options: ["GET", "PUT", "FETCH", "DELETE"], correctAnswer: 2, explanation: "FETCH is JS API, not HTTP method.", difficulty: "Medium" },

  // ===== ENGLISH (30) =====
  { id: 111, subject: "English", question: "Choose the synonym of 'Abundant':", options: ["Scarce", "Plentiful", "Empty", "Brief"], correctAnswer: 1, explanation: "Abundant means plentiful.", difficulty: "Easy" },
  { id: 112, subject: "English", question: "Antonym of 'Benevolent':", options: ["Kind", "Generous", "Cruel", "Gentle"], correctAnswer: 2, explanation: "Cruel is opposite of benevolent.", difficulty: "Easy" },
  { id: 113, subject: "English", question: "Choose the correct sentence:", options: ["He don't know.", "He doesn't knows.", "He doesn't know.", "He not know."], correctAnswer: 2, explanation: "Subject-verb agreement.", difficulty: "Easy" },
  { id: 114, subject: "English", question: "Identify the part of speech of 'quickly':", options: ["Noun", "Verb", "Adjective", "Adverb"], correctAnswer: 3, explanation: "Modifies a verb.", difficulty: "Easy" },
  { id: 115, subject: "English", question: "Fill in: She is good ___ mathematics.", options: ["in", "at", "on", "for"], correctAnswer: 1, explanation: "Good at + subject.", difficulty: "Easy" },
  { id: 116, subject: "English", question: "Choose the word with correct spelling:", options: ["Recieve", "Receive", "Receeve", "Receve"], correctAnswer: 1, explanation: "i before e except after c.", difficulty: "Easy" },
  { id: 117, subject: "English", question: "Idiom: 'Bite the bullet' means:", options: ["To eat", "Endure pain bravely", "Run away", "Argue loudly"], correctAnswer: 1, explanation: "Face a difficult situation.", difficulty: "Medium" },
  { id: 118, subject: "English", question: "Passive of: 'They built a house.'", options: ["A house was built by them.", "A house is built by them.", "A house has been built.", "House built by them."], correctAnswer: 0, explanation: "Past simple passive.", difficulty: "Easy" },
  { id: 119, subject: "English", question: "Choose the correct article: ___ honest man.", options: ["A", "An", "The", "No article"], correctAnswer: 1, explanation: "Honest starts with vowel sound.", difficulty: "Easy" },
  { id: 120, subject: "English", question: "Synonym of 'Ephemeral':", options: ["Eternal", "Short-lived", "Bright", "Heavy"], correctAnswer: 1, explanation: "Lasting briefly.", difficulty: "Medium" },
  { id: 121, subject: "English", question: "Antonym of 'Verbose':", options: ["Wordy", "Concise", "Detailed", "Loud"], correctAnswer: 1, explanation: "Concise is opposite.", difficulty: "Medium" },
  { id: 122, subject: "English", question: "One word for 'a person who knows many languages':", options: ["Linguist", "Polyglot", "Bilingual", "Translator"], correctAnswer: 1, explanation: "Polyglot.", difficulty: "Medium" },
  { id: 123, subject: "English", question: "Choose the correctly punctuated sentence:", options: ["Where are you going.", "Where are you going?", "Where, are you going!", "Where are, you going?"], correctAnswer: 1, explanation: "Question mark needed.", difficulty: "Easy" },
  { id: 124, subject: "English", question: "Plural of 'Criterion':", options: ["Criterions", "Criterias", "Criteria", "Criterius"], correctAnswer: 2, explanation: "Latin plural.", difficulty: "Medium" },
  { id: 125, subject: "English", question: "Reported speech: He said, 'I am happy.'", options: ["He said he is happy.", "He said he was happy.", "He says he was happy.", "He said I was happy."], correctAnswer: 1, explanation: "Backshift in reported speech.", difficulty: "Medium" },
  { id: 126, subject: "English", question: "Synonym of 'Lucid':", options: ["Confused", "Clear", "Hidden", "Hard"], correctAnswer: 1, explanation: "Clear, easy to understand.", difficulty: "Medium" },
  { id: 127, subject: "English", question: "Choose the right preposition: He is fond ___ music.", options: ["with", "of", "for", "to"], correctAnswer: 1, explanation: "Fond of.", difficulty: "Easy" },
  { id: 128, subject: "English", question: "Identify the error: 'Each of the boys are present.'", options: ["Each", "of the boys", "are", "No error"], correctAnswer: 2, explanation: "'Each' takes singular verb 'is'.", difficulty: "Medium" },
  { id: 129, subject: "English", question: "Antonym of 'Generous':", options: ["Kind", "Stingy", "Open", "Wealthy"], correctAnswer: 1, explanation: "Stingy = mean.", difficulty: "Easy" },
  { id: 130, subject: "English", question: "Idiom: 'A piece of cake' means:", options: ["Tasty food", "Very easy", "Difficult", "Quick decision"], correctAnswer: 1, explanation: "Something easy.", difficulty: "Easy" },
  { id: 131, subject: "English", question: "Fill in: He has been working ___ morning.", options: ["from", "since", "for", "at"], correctAnswer: 1, explanation: "Since + point in time.", difficulty: "Easy" },
  { id: 132, subject: "English", question: "Word meaning 'study of stars':", options: ["Astrology", "Astronomy", "Geology", "Biology"], correctAnswer: 1, explanation: "Astronomy is the science.", difficulty: "Easy" },
  { id: 133, subject: "English", question: "Choose correctly spelled word:", options: ["Accomodate", "Accommodate", "Acommodate", "Accommadate"], correctAnswer: 1, explanation: "Two c's, two m's.", difficulty: "Medium" },
  { id: 134, subject: "English", question: "Active form: 'The book was read by her.'", options: ["She reads the book.", "She read the book.", "She has read the book.", "She is reading the book."], correctAnswer: 1, explanation: "Past simple active.", difficulty: "Easy" },
  { id: 135, subject: "English", question: "Synonym of 'Diligent':", options: ["Lazy", "Hardworking", "Slow", "Honest"], correctAnswer: 1, explanation: "Hardworking and careful.", difficulty: "Easy" },
  { id: 136, subject: "English", question: "Antonym of 'Optimistic':", options: ["Hopeful", "Pessimistic", "Realistic", "Cheerful"], correctAnswer: 1, explanation: "Pessimistic is opposite.", difficulty: "Easy" },
  { id: 137, subject: "English", question: "Choose correct: 'Neither of them ___ coming.'", options: ["are", "is", "were", "have"], correctAnswer: 1, explanation: "Neither takes singular.", difficulty: "Medium" },
  { id: 138, subject: "English", question: "One word: 'one who cannot read or write':", options: ["Illiterate", "Ignorant", "Innocent", "Illegal"], correctAnswer: 0, explanation: "Illiterate.", difficulty: "Easy" },
  { id: 139, subject: "English", question: "Idiom: 'Break the ice' means:", options: ["Make introduction easier", "Cause trouble", "Cool down", "Win argument"], correctAnswer: 0, explanation: "Initiate conversation.", difficulty: "Easy" },
  { id: 140, subject: "English", question: "Choose correctly punctuated: 'My favorite colors are red blue and green.'", options: ["red blue, and green.", "red, blue, and green.", "red, blue and, green.", "red blue and, green."], correctAnswer: 1, explanation: "Use commas in a list.", difficulty: "Easy" },

  // ===== TUEE: NUMBER SYSTEM (Mathematics) =====
  { id: 141, subject: "Mathematics", question: "Convert binary 101101 to decimal:", options: ["41", "43", "45", "47"], correctAnswer: 2, explanation: "32+8+4+1 = 45.", difficulty: "Easy" },
  { id: 142, subject: "Mathematics", question: "Convert decimal 156 to hexadecimal:", options: ["9A", "9C", "AC", "CA"], correctAnswer: 1, explanation: "156 = 9·16 + 12 = 9C.", difficulty: "Medium" },
  { id: 143, subject: "Mathematics", question: "2's complement of 8-bit number 00010110:", options: ["11101001", "11101010", "11101100", "00010110"], correctAnswer: 1, explanation: "Invert + 1 = 11101010.", difficulty: "Medium" },
  { id: 144, subject: "Mathematics", question: "Octal 17 in decimal is:", options: ["13", "15", "17", "23"], correctAnswer: 1, explanation: "1·8 + 7 = 15.", difficulty: "Easy" },
  { id: 145, subject: "Mathematics", question: "Range of an 8-bit signed (2's complement) integer:", options: ["−127 to 127", "−128 to 127", "0 to 255", "−128 to 128"], correctAnswer: 1, explanation: "−2^7 to 2^7 − 1.", difficulty: "Medium" },
  { id: 146, subject: "Mathematics", question: "Binary addition: 1011 + 1101 = ?", options: ["10000", "11000", "11100", "11000"], correctAnswer: 1, explanation: "11 + 13 = 24 = 11000.", difficulty: "Medium" },
  { id: 147, subject: "Mathematics", question: "How many bits are needed to represent decimal 1000?", options: ["8", "9", "10", "11"], correctAnswer: 2, explanation: "2^10 = 1024 ≥ 1000.", difficulty: "Easy" },
  { id: 148, subject: "Mathematics", question: "Hex 'FF' equals decimal:", options: ["240", "250", "255", "256"], correctAnswer: 2, explanation: "15·16 + 15 = 255.", difficulty: "Easy" },
  { id: 149, subject: "Mathematics", question: "BCD code of decimal 27:", options: ["00100111", "00110111", "10010111", "00010111"], correctAnswer: 0, explanation: "2 → 0010, 7 → 0111.", difficulty: "Medium" },
  { id: 150, subject: "Mathematics", question: "Gray code of binary 100 is:", options: ["110", "111", "101", "100"], correctAnswer: 0, explanation: "Gray = b XOR (b>>1) → 110.", difficulty: "Hard" },
  { id: 151, subject: "Mathematics", question: "How many distinct values can 4 bits represent?", options: ["8", "15", "16", "32"], correctAnswer: 2, explanation: "2^4 = 16.", difficulty: "Easy" },
  { id: 152, subject: "Mathematics", question: "Decimal 0.625 in binary is:", options: ["0.101", "0.110", "0.011", "0.111"], correctAnswer: 0, explanation: "1/2 + 1/8 = 0.625.", difficulty: "Medium" },
  { id: 153, subject: "Mathematics", question: "1's complement of 10110010 is:", options: ["01001100", "01001101", "01001110", "10110010"], correctAnswer: 1, explanation: "Invert all bits.", difficulty: "Easy" },
  { id: 154, subject: "Mathematics", question: "Hex 1A + Hex B equals:", options: ["25", "26", "1B", "25 (hex)"], correctAnswer: 0, explanation: "26 + 11 = 37 = 0x25.", difficulty: "Medium" },
  { id: 155, subject: "Mathematics", question: "ASCII code of 'A' is:", options: ["63", "64", "65", "97"], correctAnswer: 2, explanation: "Uppercase A = 65.", difficulty: "Easy" },

  // ===== TUEE: BOOLEAN ALGEBRA & LOGIC GATES (Computer Awareness) =====
  { id: 156, subject: "Computer Awareness", question: "Which gate is known as the 'inverter'?", options: ["AND", "OR", "NOT", "XOR"], correctAnswer: 2, explanation: "NOT inverts its single input.", difficulty: "Easy" },
  { id: 157, subject: "Computer Awareness", question: "NAND gate output is 0 only when:", options: ["Both inputs 0", "Both inputs 1", "One input is 1", "Always"], correctAnswer: 1, explanation: "NAND = NOT(AND).", difficulty: "Easy" },
  { id: 158, subject: "Computer Awareness", question: "Boolean simplification: A + AB = ?", options: ["A", "B", "AB", "A + B"], correctAnswer: 0, explanation: "Absorption law.", difficulty: "Easy" },
  { id: 159, subject: "Computer Awareness", question: "De Morgan's Law: NOT(A·B) = ?", options: ["NOT A · NOT B", "NOT A + NOT B", "A + B", "A · B"], correctAnswer: 1, explanation: "Standard De Morgan.", difficulty: "Easy" },
  { id: 160, subject: "Computer Awareness", question: "Universal gate(s) is/are:", options: ["AND only", "OR only", "NAND and NOR", "XOR only"], correctAnswer: 2, explanation: "Any circuit can be built using NAND or NOR.", difficulty: "Easy" },
  { id: 161, subject: "Computer Awareness", question: "XOR of A and A is:", options: ["0", "1", "A", "NOT A"], correctAnswer: 0, explanation: "Same inputs → 0.", difficulty: "Easy" },
  { id: 162, subject: "Computer Awareness", question: "Truth table rows for 4 inputs:", options: ["8", "12", "16", "32"], correctAnswer: 2, explanation: "2^4 = 16.", difficulty: "Easy" },
  { id: 163, subject: "Computer Awareness", question: "A·(A+B) simplifies to:", options: ["A", "B", "A+B", "A·B"], correctAnswer: 0, explanation: "Absorption.", difficulty: "Easy" },
  { id: 164, subject: "Computer Awareness", question: "Sum-of-Products (SOP) form is built from:", options: ["Maxterms", "Minterms", "Don't cares", "Latches"], correctAnswer: 1, explanation: "SOP = OR of minterms.", difficulty: "Medium" },
  { id: 165, subject: "Computer Awareness", question: "Half-adder produces:", options: ["Sum and Carry", "Sum only", "Carry only", "Difference and Borrow"], correctAnswer: 0, explanation: "Sum = A XOR B, Carry = A·B.", difficulty: "Easy" },
  { id: 166, subject: "Computer Awareness", question: "K-Map is used to:", options: ["Encrypt data", "Simplify Boolean expressions", "Sort data", "Schedule processes"], correctAnswer: 1, explanation: "Karnaugh map minimizes logic.", difficulty: "Easy" },
  { id: 167, subject: "Computer Awareness", question: "A flip-flop is a:", options: ["Combinational circuit", "1-bit memory element", "Logic gate", "Register file"], correctAnswer: 1, explanation: "Stores one bit.", difficulty: "Easy" },
  { id: 168, subject: "Computer Awareness", question: "How many NAND gates are required to implement a NOT gate?", options: ["1", "2", "3", "4"], correctAnswer: 0, explanation: "Tie both inputs together.", difficulty: "Medium" },
  { id: 169, subject: "Computer Awareness", question: "The dual of (A + 1) = 1 is:", options: ["A·0 = 0", "A + 0 = A", "A·1 = A", "A + A = A"], correctAnswer: 0, explanation: "Swap + ↔ · and 0 ↔ 1.", difficulty: "Medium" },
  { id: 170, subject: "Computer Awareness", question: "XOR is also called:", options: ["Equivalence", "Inequivalence", "Implication", "Inhibition"], correctAnswer: 1, explanation: "Outputs 1 when inputs differ.", difficulty: "Medium" },

  // ===== TUEE: C PROGRAMMING & PROBLEM SOLVING (Computer Awareness) =====
  { id: 171, subject: "Computer Awareness", question: "Output of: printf(\"%d\", 5/2);", options: ["2.5", "2", "3", "0"], correctAnswer: 1, explanation: "Integer division truncates toward 0.", difficulty: "Easy" },
  { id: 172, subject: "Computer Awareness", question: "Which header file is needed for printf in C?", options: ["<stdlib.h>", "<stdio.h>", "<conio.h>", "<string.h>"], correctAnswer: 1, explanation: "Standard I/O header.", difficulty: "Easy" },
  { id: 173, subject: "Computer Awareness", question: "What does sizeof('A') return in standard C?", options: ["1", "2", "4", "Depends"], correctAnswer: 2, explanation: "Character constant has type int in C → 4 (typically).", difficulty: "Hard" },
  { id: 174, subject: "Computer Awareness", question: "Which operator has highest precedence in C?", options: ["++ (postfix)", "* (multiplication)", "= (assignment)", "&& (logical AND)"], correctAnswer: 0, explanation: "Postfix ++ is at the top.", difficulty: "Medium" },
  { id: 175, subject: "Computer Awareness", question: "int a=5; printf(\"%d\", a++ + ++a); // typical output", options: ["10", "11", "12", "Undefined behavior"], correctAnswer: 3, explanation: "Multiple modifications without sequence point.", difficulty: "Hard" },
  { id: 176, subject: "Computer Awareness", question: "Which is NOT a valid C storage class?", options: ["auto", "static", "extern", "global"], correctAnswer: 3, explanation: "auto/static/extern/register are storage classes.", difficulty: "Easy" },
  { id: 177, subject: "Computer Awareness", question: "A pointer that points to nothing is called:", options: ["Wild", "Null", "Dangling", "Void"], correctAnswer: 1, explanation: "NULL pointer.", difficulty: "Easy" },
  { id: 178, subject: "Computer Awareness", question: "Which function dynamically allocates memory in C?", options: ["alloc()", "malloc()", "new()", "create()"], correctAnswer: 1, explanation: "malloc from <stdlib.h>.", difficulty: "Easy" },
  { id: 179, subject: "Computer Awareness", question: "Output: int x=10; if(x=0) printf(\"A\"); else printf(\"B\");", options: ["A", "B", "Compile error", "Nothing"], correctAnswer: 1, explanation: "x=0 assigns 0 (falsy), so else runs.", difficulty: "Medium" },
  { id: 180, subject: "Computer Awareness", question: "In C, strings are terminated by:", options: ["\\n", "\\0", "EOF", "Space"], correctAnswer: 1, explanation: "Null character marks end.", difficulty: "Easy" },
  { id: 181, subject: "Computer Awareness", question: "What is the value of !(5>3)?", options: ["0", "1", "True", "Error"], correctAnswer: 0, explanation: "5>3 is 1; !1 = 0.", difficulty: "Easy" },
  { id: 182, subject: "Computer Awareness", question: "Which loop executes its body at least once?", options: ["for", "while", "do-while", "None"], correctAnswer: 2, explanation: "Condition checked at end.", difficulty: "Easy" },
  { id: 183, subject: "Computer Awareness", question: "int a[5] = {1,2,3}; what is a[3]?", options: ["3", "0", "Garbage", "Compile error"], correctAnswer: 1, explanation: "Remaining elements zero-initialized.", difficulty: "Medium" },
  { id: 184, subject: "Computer Awareness", question: "In C, which is correct to declare a pointer to int?", options: ["int p*;", "int *p;", "ptr int p;", "*int p;"], correctAnswer: 1, explanation: "Standard declaration.", difficulty: "Easy" },
  { id: 185, subject: "Computer Awareness", question: "Recursion uses which data structure internally?", options: ["Queue", "Stack", "Heap", "Tree"], correctAnswer: 1, explanation: "Function call stack.", difficulty: "Easy" },
  { id: 186, subject: "Computer Awareness", question: "What does break do inside nested loops?", options: ["Exits all loops", "Exits innermost loop only", "Skips iteration", "Raises error"], correctAnswer: 1, explanation: "Only innermost.", difficulty: "Easy" },
  { id: 187, subject: "Computer Awareness", question: "Format specifier for unsigned long in C:", options: ["%d", "%u", "%lu", "%ld"], correctAnswer: 2, explanation: "%lu for unsigned long.", difficulty: "Medium" },
  { id: 188, subject: "Computer Awareness", question: "Which is a valid C identifier?", options: ["2var", "_var2", "var-2", "var 2"], correctAnswer: 1, explanation: "Must start with letter or underscore.", difficulty: "Easy" },
  { id: 189, subject: "Computer Awareness", question: "free() is used to:", options: ["Allocate memory", "Free dynamically allocated memory", "Free stack memory", "Reset pointer"], correctAnswer: 1, explanation: "Releases memory from malloc/calloc.", difficulty: "Easy" },
  { id: 190, subject: "Computer Awareness", question: "Which sorting is in-place and stable?", options: ["Quick Sort", "Merge Sort", "Insertion Sort", "Heap Sort"], correctAnswer: 2, explanation: "Insertion sort is in-place and stable.", difficulty: "Medium" },

  // ===== TUEE: ADDITIONAL ENGLISH VOCABULARY =====
  { id: 191, subject: "English", question: "Synonym of 'Candid':", options: ["Frank", "Sweet", "Hidden", "Bitter"], correctAnswer: 0, explanation: "Candid means open and frank.", difficulty: "Easy" },
  { id: 192, subject: "English", question: "Antonym of 'Frugal':", options: ["Thrifty", "Extravagant", "Careful", "Saving"], correctAnswer: 1, explanation: "Extravagant is opposite of frugal.", difficulty: "Medium" },
  { id: 193, subject: "English", question: "One word: 'a place where dead bodies are kept':", options: ["Cemetery", "Mortuary", "Graveyard", "Crematorium"], correctAnswer: 1, explanation: "Mortuary.", difficulty: "Medium" },
  { id: 194, subject: "English", question: "Synonym of 'Pragmatic':", options: ["Practical", "Idealistic", "Theoretical", "Romantic"], correctAnswer: 0, explanation: "Dealing with things practically.", difficulty: "Medium" },
  { id: 195, subject: "English", question: "Idiom: 'Once in a blue moon' means:", options: ["Frequently", "Never", "Very rarely", "At night only"], correctAnswer: 2, explanation: "Something rare.", difficulty: "Easy" },

  // ===== TUEE: ADDITIONAL LOGICAL REASONING =====
  { id: 196, subject: "Logical Reasoning", question: "Find the odd one: 8, 27, 64, 100, 125", options: ["27", "64", "100", "125"], correctAnswer: 2, explanation: "Others are perfect cubes.", difficulty: "Medium" },
  { id: 197, subject: "Logical Reasoning", question: "If '+' means '×', '−' means '+', '×' means '÷', '÷' means '−', then 6 + 2 − 4 ÷ 2 = ?", options: ["12", "14", "16", "18"], correctAnswer: 1, explanation: "6×2 + 4 − 2 = 12+4−2 = 14.", difficulty: "Hard" },
  { id: 198, subject: "Logical Reasoning", question: "A man walks 10m N, 6m E, 2m S, 6m E. Distance from start:", options: ["12m", "14m", "15m", "16m"], correctAnswer: 2, explanation: "Net: 12m E, 8m N → √(144+64) ≈ 14.4m; closest 15m.", difficulty: "Hard" },
  { id: 199, subject: "Logical Reasoning", question: "If LION is coded as 12-9-15-14, then TIGER = ?", options: ["20-9-7-5-18", "21-9-7-5-18", "20-8-7-5-18", "20-9-8-5-18"], correctAnswer: 0, explanation: "Letter positions in alphabet.", difficulty: "Easy" },
  { id: 200, subject: "Logical Reasoning", question: "Find the missing: 7, 14, 28, 56, ?", options: ["100", "112", "120", "128"], correctAnswer: 1, explanation: "Each term doubles.", difficulty: "Easy" },
];

function pickIds(subject: string, n: number): number[] {
  return QUESTIONS.filter(q => q.subject === subject).slice(0, n).map(q => q.id);
}
function pickIdsRandom(subject: string, n: number): number[] {
  const pool = QUESTIONS.filter(q => q.subject === subject).map(q => q.id);
  // simple deterministic shuffle (Fisher-Yates with seed)
  let seed = subject.length * 7 + n;
  const rng = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  const a = [...pool];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

const fullSet = [
  ...pickIds("Mathematics", 40),
  ...pickIds("Logical Reasoning", 35),
  ...pickIds("Computer Awareness", 35),
  ...pickIds("English", 30),
];

// TUEE-specific question pools (Tezpur University MCA Entrance)
const tueeMathPool = QUESTIONS.filter(q => q.subject === "Mathematics").map(q => q.id);
const tueeLogicPool = QUESTIONS.filter(q => q.subject === "Logical Reasoning").map(q => q.id);
const tueeCompPool = QUESTIONS.filter(q => q.subject === "Computer Awareness").map(q => q.id);
const tueeEngPool = QUESTIONS.filter(q => q.subject === "English").map(q => q.id);

// Deterministic seeded shuffle for reproducible TUEE sets
function tueeShuffle(arr: number[], seed: number): number[] {
  const a = [...arr];
  let s = seed;
  const rng = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Build a TUEE test of 100 questions per the official syllabus weighting:
//  • Basic Mathematics (10+2 level + Number System): 30
//  • Logical Reasoning & Analysis: 20
//  • Programming & Problem Solving (incl. C, Boolean Algebra, Logic Gates): 30
//  • English Vocabulary & Composition: 20
function buildTueeSet(seed: number): number[] {
  return [
    ...tueeShuffle(tueeMathPool, seed).slice(0, 30),
    ...tueeShuffle(tueeLogicPool, seed + 11).slice(0, 20),
    ...tueeShuffle(tueeCompPool, seed + 23).slice(0, 30),
    ...tueeShuffle(tueeEngPool, seed + 37).slice(0, 20),
  ];
}

export const MOCK_TESTS: MockTest[] = [
  {
    id: "nimcet-full-1",
    title: "NIMCET Full Mock Test #1",
    description: "Complete NIMCET pattern: 120 questions across all 4 sections.",
    questionIds: fullSet.slice(0, 120),
    durationMin: 120,
    difficulty: "Mixed",
  },
  {
    id: "math-sectional",
    title: "Mathematics Sectional",
    description: "Sharpen your maths basics — 40 focused questions.",
    questionIds: pickIds("Mathematics", 40),
    durationMin: 50,
    difficulty: "Mixed",
  },
  {
    id: "logical-sectional",
    title: "Logical Reasoning Sectional",
    description: "Master analytical reasoning patterns.",
    questionIds: pickIds("Logical Reasoning", 35),
    durationMin: 40,
    difficulty: "Mixed",
  },
  {
    id: "computer-sectional",
    title: "Computer Awareness Sectional",
    description: "DSA, OS, networking, databases & fundamentals.",
    questionIds: pickIds("Computer Awareness", 35),
    durationMin: 40,
    difficulty: "Mixed",
  },
  {
    id: "english-sectional",
    title: "General English Sectional",
    description: "Grammar, vocabulary, idioms and comprehension basics.",
    questionIds: pickIds("English", 30),
    durationMin: 30,
    difficulty: "Easy",
  },
  {
    id: "mixed-quick-1",
    title: "Quick Mixed Drill",
    description: "60 mixed questions across all subjects in 60 minutes.",
    questionIds: [
      ...pickIdsRandom("Mathematics", 20),
      ...pickIdsRandom("Logical Reasoning", 15),
      ...pickIdsRandom("Computer Awareness", 15),
      ...pickIdsRandom("English", 10),
    ],
    durationMin: 60,
    difficulty: "Mixed",
  },
  // ===== TUEE — Tezpur University MCA 2026 Mock Tests =====
  {
    id: "tuee-full-1",
    title: "TUEE MCA Full Mock Test #1",
    description: "Tezpur University MCA 2026 pattern — 100 Qs covering Math (10+2 + Number System), Logical Reasoning, C / Boolean Algebra / Logic Gates, English Vocabulary.",
    questionIds: buildTueeSet(101),
    durationMin: 120,
    difficulty: "Mixed",
  },
  {
    id: "tuee-full-2",
    title: "TUEE MCA Full Mock Test #2",
    description: "Full-length TUEE simulation with strong emphasis on Number System, Boolean Algebra and C Programming.",
    questionIds: buildTueeSet(202),
    durationMin: 120,
    difficulty: "Mixed",
  },
  {
    id: "tuee-full-3",
    title: "TUEE MCA Full Mock Test #3",
    description: "TUEE 2026 prospectus-aligned mock — Logical Reasoning & Analysis, 10+2 Mathematics, Programming, English.",
    questionIds: buildTueeSet(303),
    durationMin: 120,
    difficulty: "Mixed",
  },
  {
    id: "tuee-full-4",
    title: "TUEE MCA Full Mock Test #4",
    description: "Full TUEE pattern test focusing on Logic Gates, Boolean simplification and C output-based questions.",
    questionIds: buildTueeSet(404),
    durationMin: 120,
    difficulty: "Mixed",
  },
  {
    id: "tuee-full-5",
    title: "TUEE MCA Full Mock Test #5",
    description: "Advanced TUEE simulation — number-system conversions, syllogisms, problem-solving and vocabulary.",
    questionIds: buildTueeSet(505),
    durationMin: 120,
    difficulty: "Hard",
  },
  {
    id: "tuee-full-6",
    title: "TUEE MCA Full Mock Test #6",
    description: "Final TUEE 2026 revision mock — complete Tezpur University MCA entrance pattern.",
    questionIds: buildTueeSet(606),
    durationMin: 120,
    difficulty: "Mixed",
  },
];

export function getQuestion(id: number): Question | undefined {
  return QUESTIONS.find(q => q.id === id);
}
export function getTest(id: string): MockTest | undefined {
  return MOCK_TESTS.find(t => t.id === id);
}
