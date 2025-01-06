import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/PromoterDetailsModel.dart';
import '../models/PromoterFormsModel.dart';
import '../screens/form/FormAllFormsPage.dart';

class PromoterService {
  static const String baseUrl =
      'http://localhost:8000/api/v1/promoter/fetchPromoterDetails';
  static Future<PromoterDetails> fetchPromoterDetails(String promoterId) async {
    final url = Uri.parse(baseUrl);
    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'promoterId': promoterId}),
    );

    print('API Response Status Code: ${response.statusCode}');
    print('API Response Body: ${response.body}');

    if (response.statusCode == 200) {
      var jsonResponse = jsonDecode(response.body);
      return PromoterDetails.fromJson(jsonResponse['data']);
    } else {
      throw Exception('Failed to fetch promoter details');
    }
  }

  static Future<List<PromoterForm>> fetchPromoterForms(
      String promoterId) async {
    final url = Uri.parse("http://localhost:8000/api/v1/promoter/fetchAllForms");
    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'promoterId': promoterId}),
    );

    print('API Response Status Code: ${response.statusCode}');
    print('API Response Body: ${response.body}');

    if (response.statusCode == 200) {
      var jsonResponse = jsonDecode(response.body);
      List<dynamic> formsJson = jsonResponse['data'];
      return formsJson.map((form) => PromoterForm.fromJson(form)).toList();
    } else {
      throw Exception('Failed to fetch promoter details');
    }
  }

  static Future<PromoterDetails> fetchNestedForms(String formId) async {
    final url = Uri.parse("http://localhost:8000/api/v1/promoter/fetchFormField");
    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'formId': formId}),
    );

    print('API Response Status Code: ${response.statusCode}');
    print('API Response Body: ${response.body}');

    if (response.statusCode == 200) {
      var jsonResponse = jsonDecode(response.body);
      return PromoterDetails.fromJson(jsonResponse['data']);
    } else {
      throw Exception('Failed to fetch promoter details');
    }
  }
}
