import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:http/http.dart' as http;

Future<List<Map<String, dynamic>>> fetchFormFilledData(String formId) async {
  final response = await http.post(
    Uri.parse('http://localhost:8000/api/v1/promoter/fetchFormFilledData'),
    headers: {'Content-Type': 'application/json'},
    body: json.encode({'formId': formId}),
  );

  if (response.statusCode == 200) {
    final responseData = json.decode(response.body);
    if (responseData['statuscode'] == 200) {
      return List<Map<String, dynamic>>.from(responseData['data']);
    } else {
      throw Exception(responseData['message']);
    }
  } else {
    throw Exception('Failed to load data');
  }
}

class FormDataScreen extends StatelessWidget {
  final String formId;

  const FormDataScreen({super.key, required this.formId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(
            Icons.arrow_back_ios_new,
            color: Colors.grey,
            size: 18,
          ),
          onPressed: () {
            Navigator.pop(context);
          },
        ),
        title: Text(
          "View Data",
          style: GoogleFonts.poppins(
            fontSize: 16,
            color: Colors.white,
            fontWeight: FontWeight.w600,
          ),
        ),
        backgroundColor: Colors.black,
      ),
      backgroundColor: Colors.black,
      body: FutureBuilder<List<Map<String, dynamic>>>(
        future: fetchFormFilledData(formId),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(
              child: Text('Error: ${snapshot.error}',
                  style: const TextStyle(color: Colors.white)),
            );
          } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(
              child: Text('No data available',
                  style: TextStyle(color: Colors.white)),
            );
          } else {
            final data = snapshot.data!;
            return ListView.builder(
              padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
              itemCount: data.length,
              itemBuilder: (context, index) {
                final entry = data[index];
                return Card(
                  margin: EdgeInsets.only(
                      bottom: 12.0), // Reduced space between cards
                  color: Colors.grey[900],
                  elevation: 4.0,
                  shape: RoundedRectangleBorder(
                    borderRadius:
                        BorderRadius.circular(8.0), // Reduced border radius
                  ),
                  child: Padding(
                    padding:
                        EdgeInsets.all(12.0), // Reduced padding inside the card
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: entry.entries.where((e) {
                        return e.key != '_id' && e.key != 'promoterId';
                      }).map((e) {
                        bool isImage = e.value
                            .toString()
                            .startsWith('http://res.cloudinary');
                        return Padding(
                          padding: EdgeInsets.symmetric(
                              vertical: 6.0), // Reduced vertical padding
                          child: Row(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Expanded(
                                flex: 5,
                                child: Text(
                                  '${e.key}:',
                                  style: GoogleFonts.poppins(
                                    fontWeight: FontWeight.bold,
                                    color: Colors.teal[200],
                                    fontSize:
                                        MediaQuery.of(context).size.width < 600
                                            ? 14
                                            : 16,
                                  ),
                                ),
                              ),
                              SizedBox(width: 4.0),
                              Expanded(
                                flex: 7,
                                child: isImage
                                    ? Image.network(
                                        e.value.toString(),
                                        height:
                                            MediaQuery.of(context).size.width <
                                                    600
                                                ? 60
                                                : 80, // Reduced image height
                                        fit: BoxFit.cover,
                                      )
                                    : Text(
                                        e.value.toString(),
                                        style: GoogleFonts.poppins(
                                          color: Colors.grey[300],
                                          fontSize: MediaQuery.of(context)
                                                      .size
                                                      .width <
                                                  600
                                              ? 14
                                              : 16,
                                        ),
                                      ),
                              ),
                            ],
                          ),
                        );
                      }).toList(),
                    ),
                  ),
                );
              },
            );
          }
        },
      ),
    );
  }
}
