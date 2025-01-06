import 'dart:convert';
import 'dart:io';
import 'package:app/utils/FormFields/DropDown.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;
import 'package:path/path.dart';
import 'package:async/async.dart';
import '../../utils/FormFields/Address.dart';
import '../../utils/FormFields/Appointment.dart';
import '../../utils/FormFields/Email.dart';
import '../../utils/FormFields/FullName.dart';
import '../../utils/FormFields/Image.dart';
import '../../utils/FormFields/LongText.dart';
import '../../utils/FormFields/Number.dart';

class FormService {
  static const String baseUrl =
      'http://localhost:8000/api/v1/promoter/fetchFormField';

  static Future<FormDetails> fetchFormDetails(String formId) async {
    try {
      final url = Uri.parse(baseUrl);
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'formId': formId}),
      );

      if (response.statusCode == 200) {
        var jsonResponse = jsonDecode(response.body);
        return FormDetails.fromJson(jsonResponse['data'][0]);
      } else {
        throw Exception(
            'Failed to fetch form details. Status code: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Failed to fetch form details. Error: $e');
    }
  }

  static Future<String> fetchCollectionName(String formId) async {
    try {
      final url = Uri.parse(baseUrl);
      final response = await http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'formId': formId}),
      );

      if (response.statusCode == 200) {
        var jsonResponse = jsonDecode(response.body);
        return jsonResponse['data'][0]['collectionName'];
      } else {
        throw Exception(
            'Failed to fetch collection name. Status code: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('Failed to fetch collection name. Error: $e');
    }
  }

  static Future<void> submitFormData(
      String collectionName, Map<String, dynamic> data) async {
    final url = Uri.parse(
        'http://localhost:8000/api/v1/promoter/fillFormData/$collectionName');

    var request = http.MultipartRequest('POST', url);

    try {
      for (var entry in data.entries) {
        var key = entry.key;
        var value = entry.value;

        if (value is File) {
          var stream =
              http.ByteStream(DelegatingStream.typed(value.openRead()));
          var length = await value.length();
          var multipartFile = http.MultipartFile(key, stream, length,
              filename: basename(value.path));
          request.files.add(multipartFile);
        } else {
          request.fields[key] = value.toString();
        }
      }

      var response = await request.send();

      if (response.statusCode == 200) {
        print('Data saved successfully');
      } else {
        throw Exception(
            'Failed to save data. Status code: ${response.statusCode}');
      }
    } catch (e) {
      print('Error saving data: $e');
      throw Exception('Failed to save data. Error: $e');
    }
  }
}

class FormDetails {
  final String campaignId;
  final List<Map<String, dynamic>> formFields;
  final String collectionName;

  FormDetails({
    required this.campaignId,
    required this.formFields,
    required this.collectionName,
  });

  factory FormDetails.fromJson(Map<String, dynamic> json) {
    List<Map<String, dynamic>> fields =
        (json['formFields'] as List).map((field) {
      return {
        'type': field['type'],
        'title': field['title'],
        'uniqueId': field['uniqueId'],
      };
    }).toList();

    return FormDetails(
      campaignId: json['campaignId'],
      formFields: fields,
      collectionName: json['collectionName'],
    );
  }
}

class FormDetailsPage extends StatefulWidget {
  final String formId;
  const FormDetailsPage({required this.formId, required String promoterId});

  @override
  State<FormDetailsPage> createState() => _FormDetailsPageState();
}

class _FormDetailsPageState extends State<FormDetailsPage> {
  late Future<FormDetails> _formDetailsFuture;
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final Map<String, dynamic> _formData = {};

  void _handleImageChange(String fieldTitle, File? imageFile) {
    if (imageFile != null) {
      setState(() {
        _formData[fieldTitle] = imageFile;
      });
    }
  }

  @override
  void initState() {
    super.initState();
    _formDetailsFuture = FormService.fetchFormDetails(widget.formId);
  }

  Widget _buildFormField(Map<String, dynamic> field) {
    String fieldType = field['type'] ?? '';
    String fieldTitle = field['title'] ?? '';
    switch (fieldType) {
      case 'Address':
        return Address(
          addressTitle: fieldTitle,
          initialValue: _formData["$fieldTitle Address"],
          onChangedAddress: (value) {
            setState(() {
              _formData['$fieldTitle Office/Building Name'] = value;
            });
          },
          onChangedStreetAddress: (value) {
            setState(() {
              _formData['$fieldTitle Street Address'] = value;
            });
          },
          onChangedStreetAddressLine2: (value) {
            setState(() {
              _formData['$fieldTitle Street Address Line 2'] = value;
            });
          },
          onChangedCity: (value) {
            setState(() {
              _formData["$fieldTitle City"] = value;
            });
          },
          onChangedState: (value) {
            setState(() {
              _formData['$fieldTitle State'] = value;
            });
          },
          onChangedPincode: (value) {
            setState(() {
              _formData['$fieldTitle Pincode'] = value;
            });
          },
        );
      case 'Date Picker':
        return Appointment(
          appointmentTitle: fieldTitle,
          initialValue: _formData[fieldTitle],
          onChanged: (value) {
            setState(() {
              _formData[fieldTitle] = value;
            });
          },
        );
      case 'Email':
        return Email(
          initialValue: _formData[fieldTitle],
          onChanged: (value) {
            setState(() {
              _formData[fieldTitle] = value;
            });
          },
          emailTitle: fieldTitle,
        );
      case 'Full Name':
        return FullName(
          initialFirstName: _formData["$fieldTitle 1"],
          initialLastName: _formData[fieldTitle + " " + '2'],
          onChangedFirstName: (value) {
            setState(() {
              _formData["$fieldTitle 1"] = value;
            });
          },
          onChangedLastName: (value) {
            setState(() {
              _formData[fieldTitle + " " + '2'] = value;
            });
          },
          fullNameTitle: fieldTitle,
        );
      case 'Image':
        return ImagePickerWidget(
          imageTitle: fieldTitle,
          onChanged: (String title, File? file) {
            _handleImageChange(fieldTitle, file);
          },
        );
      case 'Long Text':
        return LongText(
          longTextTitle: fieldTitle,
          initialValue: _formData[fieldTitle],
          onChanged: (value) {
            setState(() {
              _formData[fieldTitle] = value;
            });
          },
        );
      case 'Number':
        return Number(
          initialValue: _formData[fieldTitle],
          onChanged: (value) {
            setState(() {
              _formData[fieldTitle] = value;
            });
          },
        );
      case 'Drop Down':
        return DropDownField(
          initialValue: _formData[fieldTitle],
          onChanged: (value) {
            setState(() {
              _formData[fieldTitle] = value;
            });
          },
          dropDownFieldTile: fieldTitle,
        );
      default:
        return SizedBox.shrink();
    }
  }

  Future<String> _submitForm() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      print(_formData);
      try {
        String collectionName =
            await FormService.fetchCollectionName(widget.formId);
        await FormService.submitFormData(collectionName, _formData);
        print('Form submitted successfully!');
        setState(() {
          _formData.clear(); // This clears the data
        });
        return "Form Submitted Successfully!";
      } catch (e) {
        return "Error in submitting form";
      }
    }
    return "";
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey.shade100,
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: Center(
          child: Text(
            'Form Details',
            style: GoogleFonts.poppins(
                fontWeight: FontWeight.bold,
                color: Colors.white,
                letterSpacing: 1.5),
          ),
        ),
        titleSpacing: 2,
        shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.vertical(bottom: Radius.circular(20))),
        elevation: 3,
        shadowColor: Colors.grey.shade50,
        backgroundColor: Colors.black,
      ),
      body: FutureBuilder<FormDetails>(
        future: _formDetailsFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (snapshot.hasData) {
            final formDetails = snapshot.data!;
            return Container(
              padding: EdgeInsets.symmetric(horizontal: 16.0),
              child: SingleChildScrollView(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Form(
                      key: _formKey,
                      child: Column(
                        children: formDetails.formFields
                            .map((field) => Padding(
                                  padding: EdgeInsets.symmetric(vertical: 8.0),
                                  child: _buildFormField(field),
                                ))
                            .toList(),
                      ),
                    ),
                    SizedBox(height: 20),
                    ElevatedButton(
                      onPressed: () async {
                        String result = await _submitForm();
                        showDialog(
                          context: context,
                          builder: (context) => AlertDialog(
                            content: Text(result),
                            actions: [
                              TextButton(
                                onPressed: () {
                                  Navigator.pop(context);
                                },
                                child: Text('OK'),
                              ),
                            ],
                          ),
                        );
                      },
                      child: Text(
                        'Submit',
                        style: GoogleFonts.poppins(color: Colors.white),
                      ),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.black,
                        minimumSize: Size(double.infinity, 48),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                    ),
                    SizedBox(
                      height: 10,
                    ),
                  ],
                ),
              ),
            );
          } else {
            return Center(child: Text('No data available.'));
          }
        },
      ),
    );
  }
}
