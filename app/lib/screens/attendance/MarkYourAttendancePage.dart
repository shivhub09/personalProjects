import 'dart:io';
import 'package:app/screens/attendance/CheckWidgets.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:image_picker/image_picker.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:path/path.dart';
import 'package:async/async.dart';

class MarkYourAttendancePage extends StatefulWidget {
  final String promoterId;
  const MarkYourAttendancePage({required this.promoterId});

  @override
  State<MarkYourAttendancePage> createState() => _MarkYourAttendancePageState();
}

class _MarkYourAttendancePageState extends State<MarkYourAttendancePage> {
  String checkChoice = 'default';
  File? _checkInImage;
  File? _checkOutImage;

  final ImagePicker _picker = ImagePicker();

  Future<void> _pickImage(String choice) async {
    final pickedFile = await _picker.pickImage(source: ImageSource.camera);
    if (pickedFile != null) {
      setState(() {
        if (choice == "checkIn") {
          _checkInImage = File(pickedFile.path);
        } else {
          _checkOutImage = File(pickedFile.path);
        }
      });
    }
  }

  Future<String> _submit(
      String choice, File? imageFile, String promoterId) async {
    try {
      final url = Uri.parse('http://localhost:8000/api/v1/promoter/$choice');

      var request = http.MultipartRequest('POST', url);

      request.fields['promoterId'] = promoterId;

      String fileOption;

      if (choice == "fillAttendancePunchIn") {
        fileOption = "loginPhoto";
      } else {
        fileOption = "logOutPhoto";
      }

      if (imageFile != null) {
        var stream =
            http.ByteStream(DelegatingStream.typed(imageFile.openRead()));
        var length = await imageFile.length();
        var multipartFile = http.MultipartFile(
          fileOption,
          stream,
          length,
          filename: basename(imageFile.path),
        );
        request.files.add(multipartFile);
      }

      var response = await request.send();
      var responseBody = await http.Response.fromStream(response);

      if (response.statusCode == 201) {
        var responseData = json.decode(responseBody.body);
        return "Submitted successfully.";
      } else if (response.statusCode == 400) {
        var responseData = json.decode(responseBody.body);
        return "Error: ${responseData['message']}";
      } else {
        return "Error: ${response.statusCode}";
      }
    } catch (error) {
      return "Error: $error";
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        leading: GestureDetector(
          onTap: () {
            Navigator.pop(context);
          },
          child: const Icon(
            Icons.arrow_back_ios_new,
            color: Colors.grey,
            size: 18,
          ),
        ),
        title: Text(
          "Mark your Attendance",
          style: GoogleFonts.poppins(
              fontSize: 16, color: Colors.white, fontWeight: FontWeight.w600),
        ),
        automaticallyImplyLeading: false,
        backgroundColor: Colors.black,
      ),
      body: Column(
        children: [
          // Content above the bottom container
          Column(
            children: [
              GestureDetector(
                onTap: () {
                  setState(() {
                    checkChoice = 'CheckIn';
                  });
                },
                child: const CheckWidgets(
                  checkTitle: "Punch In",
                  icon: Icons.more_time_sharp,
                ),
              ),
              GestureDetector(
                onTap: () {
                  setState(() {
                    checkChoice = 'CheckOut';
                  });
                },
                child: const CheckWidgets(
                  checkTitle: "Punch Out",
                  icon: Icons.timer_outlined,
                ),
              ),
            ],
          ),

          Expanded(
            child: Container(
              margin: const EdgeInsets.only(top: 20),
              padding: const EdgeInsets.all(16.0),
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  colors: [Colors.grey.shade800.withOpacity(0.1), Colors.black],
                  begin: Alignment.topLeft,
                  end: Alignment.bottomRight,
                ),
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(40.0),
                  topRight: Radius.circular(40.0),
                ),
                color: Colors
                    .black, // Fallback color in case gradient is not applied
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  if (checkChoice == 'CheckIn') ...[
                    Center(
                      child: Column(
                        children: [
                          _checkInImage == null
                              ? Container()
                              : Container(
                                  height: 200,
                                  width: 200,
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(20),
                                    boxShadow: [
                                      BoxShadow(
                                        color: Colors.black.withOpacity(0.2),
                                        spreadRadius: 2,
                                        blurRadius: 5,
                                        offset: const Offset(0, 3),
                                      ),
                                    ],
                                    border: Border.all(
                                      color: Colors.grey.withOpacity(0.8),
                                      width: 2,
                                    ),
                                  ),
                                  child: ClipRRect(
                                    borderRadius: BorderRadius.circular(20),
                                    child: Image.file(
                                      _checkInImage!,
                                      fit: BoxFit.cover,
                                    ),
                                  ),
                                ),
                          const SizedBox(height: 20),
                          ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.grey,
                              foregroundColor: Colors.white,
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 50, vertical: 15),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(18.0),
                              ),
                              shadowColor: Colors.black.withOpacity(0.25),
                              elevation: 5,
                            ),
                            onPressed: () => {_pickImage('checkIn')},
                            child: Text(
                              'Click Photo',
                              style: GoogleFonts.poppins(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                              ),
                            ),
                          ),
                          const SizedBox(height: 20),
                          ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.grey,
                              foregroundColor: Colors.white,
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 50, vertical: 15),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(18.0),
                              ),
                              shadowColor: Colors.black.withOpacity(0.25),
                              elevation: 5,
                            ),
                            onPressed: () async {
                              String message = await _submit(
                                  'fillAttendancePunchIn',
                                  _checkInImage,
                                  widget.promoterId);
                              setState(() {
                                _checkInImage = null; // Clear the image
                              });
                              showCustomSnackBar(context, message);
                            },
                            child: Text(
                              'Punch In',
                              style: GoogleFonts.poppins(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16,
                                  letterSpacing: 1),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ] else if (checkChoice == 'CheckOut') ...[
                    Center(
                      child: Column(
                        children: [
                          _checkOutImage == null
                              ? Container()
                              : Container(
                                  height: 200,
                                  width: 200,
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(20),
                                    boxShadow: [
                                      BoxShadow(
                                        color: Colors.black.withOpacity(0.2),
                                        spreadRadius: 2,
                                        blurRadius: 5,
                                        offset: const Offset(0, 3),
                                      ),
                                    ],
                                    border: Border.all(
                                      color: Colors.grey.withOpacity(0.8),
                                      width: 2,
                                    ),
                                  ),
                                  child: ClipRRect(
                                    borderRadius: BorderRadius.circular(20),
                                    child: Image.file(
                                      _checkOutImage!,
                                      fit: BoxFit.cover,
                                    ),
                                  ),
                                ),
                          const SizedBox(
                            height: 20,
                          ),
                          ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.grey,
                              foregroundColor: Colors.white,
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 50, vertical: 15),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(18.0),
                              ),
                              shadowColor: Colors.black.withOpacity(0.25),
                              elevation: 5,
                            ),
                            onPressed: () => {_pickImage('checkOut')},
                            child: Text(
                              'Click Photo',
                              style: GoogleFonts.poppins(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: 16,
                              ),
                            ),
                          ),
                          const SizedBox(height: 20),
                          ElevatedButton(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.grey,
                              foregroundColor: Colors.white,
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 50, vertical: 15),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(18.0),
                              ),
                              shadowColor: Colors.black.withOpacity(0.25),
                              elevation: 5,
                            ),
                            onPressed: () async {
                              String message = await _submit(
                                  'fillAttendancePunchOut',
                                  _checkOutImage,
                                  widget.promoterId);
                              setState(() {
                                _checkOutImage = null;
                              });
                              // Clear the image
                              showCustomSnackBar(context, message);
                            },
                            child: Text(
                              'Punch Out',
                              style: GoogleFonts.poppins(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 16,
                                  letterSpacing: 1),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

void showCustomSnackBar(BuildContext context, String message) {
  ScaffoldMessenger.of(context).showSnackBar(
    SnackBar(
      content: Text(
        message,
        style: GoogleFonts.poppins(
            fontSize: 16, fontWeight: FontWeight.bold, color: Colors.black),
      ),
      backgroundColor: Colors.white, // Background color
      behavior: SnackBarBehavior
          .floating, // Makes the Snackbar float above the content
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15.0), // Rounded corners
      ),
      margin: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
      padding: const EdgeInsets.symmetric(
          horizontal: 20.0, vertical: 15.0), // Padding
      duration: const Duration(seconds: 3),
    ),
  );
}
