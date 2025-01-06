// import 'dart:convert';
// import 'package:app/mainScreen.dart';
// import 'package:app/screens/form/PromoterDetailsPage.dart';
// import 'package:flutter/material.dart';
// import 'package:google_fonts/google_fonts.dart';
// import 'package:http/http.dart' as http;

// class LoginPage extends StatefulWidget {
//   const LoginPage({Key? key}) : super(key: key);

//   @override
//   State<LoginPage> createState() => _LoginPageState();
// }

// class _LoginPageState extends State<LoginPage> {
//   TextEditingController emailController = TextEditingController();
//   TextEditingController passwordController = TextEditingController();
//   String errorText = '';

//   Future<void> loginUser(String email, String password) async {
//     try {
//       var response = await http.post(
//         Uri.parse('http://localhost:8000/api/v1/promoter/loginPromoter'),
//         headers: <String, String>{
//           'Content-Type': 'application/json; charset=UTF-8',
//         },
//         body: jsonEncode(<String, String>{
//           'email': email,
//           'password': password,
//         }),
//       );

//       // print('Response status: ${response.statusCode}');
//       // print('Response body: ${response.body}');

//       if (response.statusCode == 200) {
//         var jsonResponse = jsonDecode(response.body);
//         var promoterId = jsonResponse['data']['_id'];

//         if (promoterId != null) {
//           Navigator.push(
//             context,
//             MaterialPageRoute(
//               builder: (context) => PromoterDetailsPage(promoterId: promoterId),
//             ),
//           );
//         } else {
//           setState(() {
//             errorText = 'Login failed. Invalid response from server.';
//           });
//         }
//       } else {
//         setState(() {
//           errorText = 'Login failed. Please check your credentials.';
//         });
//       }
//     } catch (e) {
//       setState(() {
//         errorText = 'An error occurred. Please try again later.';
//       });
//       // print('Error: $e');
//     }
//   }

//   @override
//   Widget build(BuildContext context) {
//     final screenWidth = MediaQuery.of(context).size.width;
//     final screenHeight = MediaQuery.of(context).size.height;
//     final isLandscape = screenWidth > screenHeight;

//     return Scaffold(
//       appBar: AppBar(
//         backgroundColor: Colors.white,
//         elevation: 0,
//       ),
//       backgroundColor: Colors.white,
//       body: Stack(
//         children: [
//           Positioned(
//             top: isLandscape ? screenHeight * 0.02 : screenHeight * 0.05,
//             left: screenWidth * 0.05,
//             right: screenWidth * 0.05,
//             child: Image.asset(
//               'assets/SAND 1 logo.png',
//               fit: BoxFit.cover,
//               height: isLandscape ? screenHeight * 0.2 : screenHeight * 0.09,
//             ),
//           ),
//           SingleChildScrollView(
//             child: Padding(
//               padding: EdgeInsets.symmetric(horizontal: screenWidth * 0.05),
//               child: Column(
//                 children: [
//                   SizedBox(height: screenHeight * 0.25),
//                   Container(
//                     decoration: BoxDecoration(
//                       color: const Color.fromRGBO(21, 25, 24, 1),
//                       borderRadius: BorderRadius.circular(20),
//                       boxShadow: [
//                         BoxShadow(
//                           color: Colors.black.withOpacity(0.2),
//                           spreadRadius: 2,
//                           blurRadius: 7,
//                           offset: const Offset(0, 3),
//                         ),
//                       ],
//                     ),
//                     padding: EdgeInsets.all(screenWidth * 0.05),
//                     child: Column(
//                       mainAxisAlignment: MainAxisAlignment.center,
//                       children: [
//                         Text(
//                           'LOGIN',
//                           style: GoogleFonts.poppins(
//                             fontSize: screenWidth * 0.07,
//                             fontWeight: FontWeight.bold,
//                             color: Colors.white,
//                           ),
//                         ),
//                         SizedBox(height: screenHeight * 0.02),
//                         TextField(
//                           controller: emailController,
//                           decoration: InputDecoration(
//                             labelText: 'Email',
//                             labelStyle:
//                                 GoogleFonts.poppins(color: Colors.white),
//                             prefixIcon: Icon(Icons.email,
//                                 color: Colors.white, size: screenWidth * 0.06),
//                             enabledBorder: OutlineInputBorder(
//                               borderSide: const BorderSide(color: Colors.white),
//                               borderRadius: BorderRadius.circular(10),
//                             ),
//                             focusedBorder: OutlineInputBorder(
//                               borderSide: const BorderSide(color: Colors.white),
//                               borderRadius: BorderRadius.circular(10),
//                             ),
//                             filled: true,
//                             fillColor: Colors.grey[800],
//                           ),
//                           style: GoogleFonts.poppins(color: Colors.white),
//                         ),
//                         SizedBox(height: screenHeight * 0.02),
//                         TextField(
//                           controller: passwordController,
//                           obscureText: true,
//                           decoration: InputDecoration(
//                             labelText: 'Password',
//                             labelStyle:
//                                 GoogleFonts.poppins(color: Colors.white),
//                             prefixIcon: Icon(Icons.lock,
//                                 color: Colors.white, size: screenWidth * 0.06),
//                             enabledBorder: OutlineInputBorder(
//                               borderSide: const BorderSide(color: Colors.white),
//                               borderRadius: BorderRadius.circular(10),
//                             ),
//                             focusedBorder: OutlineInputBorder(
//                               borderSide: const BorderSide(color: Colors.white),
//                               borderRadius: BorderRadius.circular(10),
//                             ),
//                             filled: true,
//                             fillColor: Colors.grey[800],
//                           ),
//                           style: GoogleFonts.poppins(color: Colors.white),
//                         ),
//                         SizedBox(height: screenHeight * 0.03),
//                         SizedBox(
//                           width: double.infinity,
//                           child: ElevatedButton(
//                             onPressed: () {
//                               String email = emailController.text;
//                               String password = passwordController.text;
//                               // Call loginUser function to send login request
//                               loginUser(email, password);
//                             },
//                             style: ElevatedButton.styleFrom(
//                               backgroundColor: Colors.white,
//                               foregroundColor: Colors.white,
//                               padding: EdgeInsets.symmetric(
//                                   vertical: screenHeight * 0.02),
//                               shape: RoundedRectangleBorder(
//                                 borderRadius: BorderRadius.circular(10),
//                               ),
//                               elevation: 5,
//                             ),
//                             child: Text(
//                               'LOGIN',
//                               style: GoogleFonts.poppins(
//                                 fontWeight: FontWeight.bold,
//                                 color: Colors.black,
//                                 fontSize: screenWidth * 0.06,
//                                 letterSpacing: 2,
//                               ),
//                             ),
//                           ),
//                         ),
//                         SizedBox(height: screenHeight * 0.01),
//                         Text(
//                           errorText,
//                           style: TextStyle(
//                             color: Colors.red,
//                             fontSize: screenWidth * 0.035,
//                           ),
//                         ),
//                       ],
//                     ),
//                   ),
//                   SizedBox(height: screenHeight * 0.1),
//                 ],
//               ),
//             ),
//           ),
//         ],
//       ),
//     );
//   }
// }

import 'dart:convert';
import 'package:app/screens/form/PromoterDetailsPage.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  String errorText = '';
  bool isLoading = false;

  Future<void> loginUser(String email, String password) async {
    setState(() {
      isLoading = true; // Show the loading spinner
      errorText = ''; // Clear any previous error messages
    });

    try {
      var response = await http.post(
        Uri.parse('http://localhost:8000/api/v1/promoter/loginPromoter'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'email': email,
          'password': password,
        }),
      );

      if (response.statusCode == 200) {
        var jsonResponse = jsonDecode(response.body);
        var promoterId = jsonResponse['data']['_id'];

        if (promoterId != null) {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => PromoterDetailsPage(promoterId: promoterId),
            ),
          );
        } else {
          setState(() {
            errorText = 'Login failed. Invalid response from server.';
          });
        }
      } else {
        setState(() {
          errorText = 'Login failed. Please check your credentials.';
        });
      }
    } catch (e) {
      setState(() {
        errorText = 'An error occurred. Please try again later.';
      });
    } finally {
      setState(() {
        isLoading = false; // Hide the loading spinner
      });
    }
  }

  void handleLogin() {
    String email = emailController.text.trim();
    String password = passwordController.text.trim();
    if (email.isNotEmpty && password.isNotEmpty) {
      loginUser(email, password);
    } else {
      setState(() {
        errorText = 'Please fill in all fields.';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final screenWidth = MediaQuery.of(context).size.width;
    final screenHeight = MediaQuery.of(context).size.height;
    final isLandscape = screenWidth > screenHeight;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
      ),
      backgroundColor: Colors.white,
      body: Stack(
        children: [
          Positioned(
            top: isLandscape ? screenHeight * 0.02 : screenHeight * 0.05,
            left: screenWidth * 0.05,
            right: screenWidth * 0.05,
            child: Image.asset(
              'assets/SAND 1 logo.png',
              fit: BoxFit.cover,
              height: isLandscape ? screenHeight * 0.2 : screenHeight * 0.09,
            ),
          ),
          SingleChildScrollView(
            child: Padding(
              padding: EdgeInsets.symmetric(horizontal: screenWidth * 0.05),
              child: Column(
                children: [
                  SizedBox(height: screenHeight * 0.25),
                  Container(
                    decoration: BoxDecoration(
                      color: const Color.fromRGBO(21, 25, 24, 1),
                      borderRadius: BorderRadius.circular(20),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.2),
                          spreadRadius: 2,
                          blurRadius: 7,
                          offset: const Offset(0, 3),
                        ),
                      ],
                    ),
                    padding: EdgeInsets.all(screenWidth * 0.05),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          'LOGIN',
                          style: GoogleFonts.poppins(
                            fontSize: screenWidth * 0.07,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                        SizedBox(height: screenHeight * 0.02),
                        TextField(
                          controller: emailController,
                          decoration: InputDecoration(
                            labelText: 'Email',
                            labelStyle:
                                GoogleFonts.poppins(color: Colors.white),
                            prefixIcon: Icon(Icons.email,
                                color: Colors.white, size: screenWidth * 0.06),
                            enabledBorder: OutlineInputBorder(
                              borderSide: const BorderSide(color: Colors.white),
                              borderRadius: BorderRadius.circular(10),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderSide: const BorderSide(color: Colors.white),
                              borderRadius: BorderRadius.circular(10),
                            ),
                            filled: true,
                            fillColor: Colors.grey[800],
                          ),
                          style: GoogleFonts.poppins(color: Colors.white),
                          onSubmitted: (_) => handleLogin(), // Submit on Enter
                        ),
                        SizedBox(height: screenHeight * 0.02),
                        TextField(
                          controller: passwordController,
                          obscureText: true,
                          decoration: InputDecoration(
                            labelText: 'Password',
                            labelStyle:
                                GoogleFonts.poppins(color: Colors.white),
                            prefixIcon: Icon(Icons.lock,
                                color: Colors.white, size: screenWidth * 0.06),
                            enabledBorder: OutlineInputBorder(
                              borderSide: const BorderSide(color: Colors.white),
                              borderRadius: BorderRadius.circular(10),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderSide: const BorderSide(color: Colors.white),
                              borderRadius: BorderRadius.circular(10),
                            ),
                            filled: true,
                            fillColor: Colors.grey[800],
                          ),
                          style: GoogleFonts.poppins(color: Colors.white),
                          onSubmitted: (_) => handleLogin(), // Submit on Enter
                        ),
                        SizedBox(height: screenHeight * 0.03),
                        SizedBox(
                          width: double.infinity,
                          child: ElevatedButton(
                            onPressed: isLoading
                                ? null
                                : handleLogin, // Disable button while loading
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.white,
                              foregroundColor: Colors.white,
                              padding: EdgeInsets.symmetric(
                                  vertical: screenHeight * 0.02),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(10),
                              ),
                              elevation: 5,
                            ),
                            child: isLoading
                                ? CircularProgressIndicator(
                                    color: Colors.black,
                                  )
                                : Text(
                                    'LOGIN',
                                    style: GoogleFonts.poppins(
                                      fontWeight: FontWeight.bold,
                                      color: Colors.black,
                                      fontSize: screenWidth * 0.06,
                                      letterSpacing: 2,
                                    ),
                                  ),
                          ),
                        ),
                        SizedBox(height: screenHeight * 0.01),
                        Text(
                          errorText,
                          style: TextStyle(
                            color: Colors.red,
                            fontSize: screenWidth * 0.035,
                          ),
                        ),
                      ],
                    ),
                  ),
                  SizedBox(height: screenHeight * 0.1),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}
